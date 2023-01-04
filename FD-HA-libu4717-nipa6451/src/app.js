import notes from "../data/notes.json" assert { type: "json" };
import imageData from "../data/notes.json" assert { type: "json" };
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";
import * as path from "https://deno.land/std@0.152.0/path/posix.ts";
import * as mediaTypes from "https://deno.land/std@0.151.0/media_types/mod.ts";

import * as controller from "./controller.js";
import * as formController from "./form-controller.js";
import { add } from "./model.js";

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
    return await controller.index(ctx);
  }

  //About
  if (url.pathname.match("/about")) {
    return await controller.about(ctx);
  }

  //Adidas
  if (url.pathname.match("/adidas")) {
    return await controller.adidas(ctx);
  }
  //Yezzy-V1
  if (url.pathname.match("/Yeezyv1")) {
    return await controller.yeezyv1(ctx);
  }
  //Yeezy-V2
  if (url.pathname.match("/Yeezyv2")) {
    return await controller.yeezyv2(ctx);
  }

  //Nike
  if (url.pathname.match("/nike")) {
    return await controller.nike(ctx);
  }
  //Jordan-1-Modelle
  if (url.pathname.match("/Jordan1Modelle")) {
    return await controller.jordan1Modelle(ctx);
  }
  //Jordan-3-Modelle
  if (url.pathname.match("/Jordan3Modelle")) {
    return await controller.jordan3Modelle(ctx);
  }
  //Jordan-4-Modelle
  if (url.pathname.match("/Jordan4Modelle")) {
    return await controller.jordan4Modelle(ctx);
  }
  //Dunk-Modelle
  if (url.pathname.match("/DunkModelle")) {
    return await controller.dunkModelle(ctx);
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
  //Login
  if (url.pathname.match("/login")) {
    return await controller.login(ctx);
  }
  //Register
  if (url.pathname.match("/register")) {
    return await controller.register(ctx);
  }
  //404-Error
  return await controller.error404(ctx);
};

const serveStaticFile = async (base, ctx) => {
  const url = new URL(ctx.request.url);
  let file;
  try {
    console.log(path.join(base, url.pathname.toString()));
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

export const handleRequest = async (request) => {
  const db = new DB("data/notes.sqlite", { mode: "read" });
  let ctx = {
    data: imageData,
    nunjucks: nunjucks,
    request: request,
    params: {},
    response: {
      body: undefined,
      status: undefined,
      headers: {},
    },
  };
  db.close();

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
