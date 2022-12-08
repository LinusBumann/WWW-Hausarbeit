import notes from "../data/notes.json" assert { type: "json" };
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

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
    return await controller.datenschutzs(ctx);
  }

  //404-Error
  return await controller.error404(ctx);
};

export const handleRequest = async (request) => {
  const db = new DB("data/notes.sqlite", { mode: "read" });
  const ctx = {
    data: db.queryEntries("SELECT * FROM notes"),
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
