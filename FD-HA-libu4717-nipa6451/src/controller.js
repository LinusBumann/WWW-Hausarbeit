import * as model from "./model.js";
import { debug as Debug } from "https://deno.land/x/debug/mod.ts";

const debug = Debug("app:controller");

export async function error404(ctx) {
  debug("@error404. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("error404.html", {
    nutzer,
  });
  ctx.response.status = 404;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function about(ctx) {
  debug("@about. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("aboutUs.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function index(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  const a = model.getIndexValues(ctx.db);
  ctx.response.body = ctx.nunjucks.render("nunjucksindex.html", {
    dbData: a,
    nutzer,
  });

  console.log(a);

  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function baureihen(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  const a = model.getHersteller(ctx.db, ctx.params.herstellerID);
  ctx.response.body = ctx.nunjucks.render("nunjucksmarkenseite.html", {
    dbData: a,
    nutzer,
  });

  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function schuhe(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  const a = model.getSchuh(ctx.db, ctx.params.baureihe);
  ctx.response.body = ctx.nunjucks.render("nunjucksschuhseite.html", {
    dbData: a,
    nutzer,
  });

  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function datenschutz(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("datenschutz.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function dokumentation(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("dokumentation.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function htmlpur(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("html-pur.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function kollophon(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("kollophon.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function kontakt(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("kontakt.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function login(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("login.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function register(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("register.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function farben(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("_farben.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function mainDoku(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("mainDokumentation.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function erklärungNipa6451(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("Erklärung-nipa6451.html", {
    nutzer,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function erklärungLibu4717(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("Erklärung-libu4717.html", {
    nutzer,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function timeline(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("timeline.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function module(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("module.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function userProfile(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  console.log("User:", nutzer);
  ctx.response.body = ctx.nunjucks.render("userProfile.html", {
    nutzer,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}
export async function schuheBearbeiten(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  //const data = model.getById(ctx.data, ctx.params.id);
  const nutzer = await model.getNutzer(ctx.db);
  const a = model.getSchuhID(ctx.db, ctx.params.schuhID);
  ctx.response.body = ctx.nunjucks.render("schuheBearbeiten.html", {
    dbData: a,
    nutzer,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  console.log("im A steht:", a);
  return ctx;
}

export async function schuheHinzufügen(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const nutzer = await model.getNutzer(ctx.db);
  ctx.response.body = ctx.nunjucks.render("schuheHinzufügen.html", { nutzer });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}
