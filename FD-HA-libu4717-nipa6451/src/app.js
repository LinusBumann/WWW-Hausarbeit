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

  if (url.pathname == "/") {
    return await controller.index(ctx);
  }
  if (url.pathname.match("/about")) {
    return await controller.about(ctx);
  }
  if (url.pathname.match("/form")) {
    if (myRequest.method == "GET") {
      return await formController.add(ctx);
    }
    if (myRequest.method == "POST") {
      return await formController.submitAdd(ctx);
    }
  }
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

  // Fallback
  result.response.status = result.response.status ?? 404;
  if (!result.response.body && result.response.status == 404) {
    result = await controller.error404(result);
  }
  return new Response(result.response.body, {
    status: result.response.status,
    headers: result.response.headers,
  });
};
