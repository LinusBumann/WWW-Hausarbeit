import * as model from "./model.js";
import { debug as Debug } from "https://deno.land/x/debug/mod.ts";

const debug = Debug("app:controller");

export function error404(ctx) {
  debug("@error404. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("error404.html", {});
  ctx.response.status = 404;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export function about(ctx) {
  debug("@about. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("aboutUs.html", {});
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function index(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const a = model.getIndexValues(ctx.db);
  ctx.response.body = ctx.nunjucks.render("nunjucksindex.html", {
    dbData: a,
  });

  console.log(a);

  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function nunjucksmarkenseite(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const a = model.getModellValues(ctx.db);
  ctx.response.body = ctx.nunjucks.render("nunjucksmarkenseite.html", {
    dbData: a,
  });

  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function nunjucksschuhseite(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  const a = model.getSchuhValues(ctx.db);
  ctx.response.body = ctx.nunjucks.render("nunjucksschuhseite.html", {
    dbData: a,
  });

  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function datenschutz(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("datenschutz.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function dokumentation(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("dokumentation.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function htmlpur(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("html-pur.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function kollophon(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("kollophon.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function kontakt(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("kontakt.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function login(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("login.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function register(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("register.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function farben(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("_farben.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function mainDoku(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("mainDokumentation.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function erklärungNipa6451(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("Erklärung-nipa6451.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function erklärungLibu4717(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("Erklärung-libu4717.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function timeline(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("timeline.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function module(ctx) {
  debug("@index. ctx %O", ctx.request.url);
  ctx.response.body = ctx.nunjucks.render("module.html", {
    notes: ctx.data,
  });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}
