import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";
import * as path from "https://deno.land/std@0.152.0/path/posix.ts";
import * as mediaTypes from "https://deno.land/std@0.151.0/media_types/mod.ts";
import { encode as base64Encode } from "https://deno.land/std@0.171.0/encoding/base64.ts";
import * as model from "./model.js";

import * as controller from "./controller.js";
import * as formController from "./form-controller.js";
import { addRegister, getNutzer } from "./model.js";

// DEV only: noCache:true
nunjucks.configure("templates", { autoescape: true, noCache: true });

/**
 * Add a router function here
 */
//Router an die Aufgabe anpassen
const router = async (ctx) => {
  if (ctx.response.status == 200) return ctx;
  const url = new URL(ctx.request.url);
  const myRequest = ctx.request; //Request für Unterscheidung von POST und GET

  //Index
  if (url.pathname == "/") {
    //console.log("Index");
    return await controller.index(ctx);
  }

  //Nunjucks Markenseite
  //Beispielurl: hersteller/20
  if (url.pathname.match("/hersteller")) {
    //console.log("Meine Baureihen URL: ", url.pathname);
    //Auslesen der Hersteller-ID
    let fullURL = url.pathname;
    let split = fullURL.split("/");
    let herstellerID = split[2];
    ctx.params.herstellerID = Number(herstellerID);
    return await controller.baureihen(ctx);
  }

  //Nunjucks Markenseite
  if (url.pathname.match("/baureihe")) {
    //console.log("Meine Schuh URL: ", url.pathname);
    //Auslesen der Baureihe-ID
    let fullURL = url.pathname;
    let split = fullURL.split("/");
    let baureiheID = split[2];
    ctx.params.baureihe = Number(baureiheID);
    return await controller.schuhe(ctx);
  }

  //Farben
  if (url.pathname.match("/_farben")) {
    return await controller.farben(ctx);
  }

  //MainDoku
  if (url.pathname.match("/mainDokumentation")) {
    return await controller.mainDoku(ctx);
  }

  //Erklärung Nico
  if (url.pathname.match("/Erklärung-nipa6451")) {
    return await controller.erklärungNipa6451(ctx);
  }

  //Erklärung Linus
  if (url.pathname.match("/Erklärung-libu4717")) {
    return await controller.erklärungLibu4717(ctx);
  }

  //Timeline
  if (url.pathname.match("/timeline")) {
    return await controller.timeline(ctx);
  }

  //Module
  if (url.pathname.match("/module")) {
    return await controller.module(ctx);
  }

  //About
  if (url.pathname.match("/about")) {
    return await controller.about(ctx);
  }

  //Dokumentation
  if (url.pathname.match("/dokumentation")) {
    return await controller.dokumentation(ctx);
  }
  //Kollophon
  if (url.pathname.match("/kollophon")) {
    return await controller.kollophon(ctx);
  }
  //Kontakt
  if (url.pathname.match("/kontakt")) {
    return await controller.kontakt(ctx);
  }

  //Datenschutz
  if (url.pathname.match("/datenschutz")) {
    return await controller.datenschutz(ctx);
  }

  //Register GET und POST
  if (url.pathname.match("/register")) {
    if (myRequest.method == "GET") {
      //console.log("GET: Registrieren");
      return await formController.addRegister(ctx);
    }
    if (myRequest.method == "POST") {
      //console.log("POST: Registrieren");
      return await formController.submitAddRegister(ctx);
    }
  }

  //Login
  if (url.pathname.match("/login")) {
    if (myRequest.method == "GET") {
      //console.log("GET: Login");
      return await formController.addLogin(ctx);
    }
    if (myRequest.method == "POST") {
      // console.log("POST: Login");
      return await formController.submitAddLogin(ctx);
    }
  }
  //Profil
  if (url.pathname.match("/userProfile")) {
    if (ctx.nutzer) {
      if (myRequest.method == "GET") {
        //console.log("GET: UserProfile");
        return await controller.userProfile(ctx);
      }
      if (myRequest.method == "POST") {
        //console.log("POST: Logout");
        return await formController.logoutUser(ctx);
      }
    } else if (ctx.nutzer == undefined) {
      return await controller.permissionsDenied(ctx);
    }
  }

  //SchuhBearbeiten
  if (url.pathname.match("/schuheBearbeiten")) {
    //Auslesen der Schuh-ID
    if (ctx.nutzer) {
      let fullURL = url.pathname;
      let split = fullURL.split("/");
      let schuhID = split[2];
      ctx.params.schuhID = Number(schuhID);

      if (myRequest.method == "GET") {
        console.log("GET: Bearbeiten");
        return await controller.schuheBearbeitenGET(ctx);
      }
      if (myRequest.method == "POST") {
        //console.log("POST: Bearbeiten");
        return await formController.submitAddSchuhBearbeitung(ctx);
      }
    } else if (ctx.nutzer == undefined || ctx.nutzer.status != "admin") {
      return await controller.permissionsDenied(ctx);
    }
  }
  //SchuhHinzufügen
  if (url.pathname.match("/schuheHinzufeugen")) {
    if (ctx.nutzer && ctx.nutzer.status == "admin") {
      if (myRequest.method == "GET") {
        return await controller.schuheHinzufügen(ctx);
      }
      if (myRequest.method == "POST") {
        return await formController.submitAddSchuheHinzufügen(ctx);
      }
    } else if (ctx.nutzer == undefined || ctx.nutzer.status != "admin") {
      return await controller.permissionsDenied(ctx);
    }
  }

  // Schuhe Entfernen
  if (url.pathname.match("/schuheEntfernen")) {
    if (ctx.nutzer && ctx.nutzer.status == "admin") {
      if (myRequest.method == "GET") {
        return await controller.schuheEntfernen(ctx);
      }
      if (myRequest.method == "POST") {
        return await formController.schuheEntfernen(ctx);
      }
    } else if (ctx.nutzer == undefined || ctx.nutzer.status != "admin") {
      return await controller.permissionsDenied(ctx);
    }
  }

  //404-Error
  return await controller.error404(ctx);
};

const serveStaticFile = async (base, ctx) => {
  const url = new URL(ctx.request.url);
  let file;
  try {
    //console.log(path.join(base, url.pathname.toString()));
    file = await Deno.open(path.join(base, url.pathname.toString()), {
      read: true,
    });
  } catch (_error) {
    return ctx;
  }
  const { ext } = path.parse(url.pathname.toString());
  const contentType = mediaTypes.contentType(ext);
  if (contentType) {
    ctx.response.status = 200;
    ctx.response.body = file.readable; // Use readable stream ctx.response.headers["Content-type"] = contentType; ctx.response.status = 200;
  } else {
    Deno.close(file.rid);
  }
  return ctx;
};

const createId = () => {
  const array = new Uint32Array(64);
  crypto.getRandomValues(array);
  return base64Encode(array);
};

const getSessionNutzer = async (ctx) => {
  const session = await model.getSession(ctx.db, ctx.sessionID);
  if (session) {
    const nutzer = await model.getNutzer(ctx.db, session.email);
    if (nutzer) {
      ctx.nutzer = nutzer;
    }
  } else {
    ctx.nutzer = undefined;
  }
  return ctx;
};

const db = new DB("data/sneakpeakdata.sqlite");

export const handleRequest = async (request) => {
  let ctx = {
    db: db,
    nunjucks: nunjucks,
    request: request,
    params: {},
    response: {
      body: undefined,
      status: undefined,
      headers: {},
    },
  };

  if (!ctx.request.headers.get("cookie")) {
    let sessionID = createId();
    ctx.response.headers["Set-Cookie"] =
      sessionID = `${sessionID}; Max-Age = 604800`;
    ctx.sessionID = sessionID;
  } else {
    const cookie = ctx.request.headers.get("cookie");
    ctx.sessionID = cookie.split("=")[1];
  }

  ctx = await getSessionNutzer(ctx);
  //console.log(ctx.nutzer);

  const base = "assets";
  ctx = await serveStaticFile(base, ctx);

  /**
   * Call the router function and assign result.
   */

  let result = await router(ctx);

  // Handle redirect
  if (ctx.redirect) {
    return ctx.redirect;
  }

  //Fallback
  result.response.status = result.response.status ?? 404;
  if (!result.response.body && result.response.status == 404) {
    result = await controller.error404(result);
  }
  return new Response(result.response.body, {
    status: result.response.status,
    headers: result.response.headers,
  });
};
