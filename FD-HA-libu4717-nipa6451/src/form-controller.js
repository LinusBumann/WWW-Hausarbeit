import * as model from "./model.js";
import { debug as Debug } from "https://deno.land/x/debug/mod.ts";

const debug = Debug("app:formController");

/*
Use browser and IDE side-by-side.
*/

// @KLUDGE: Kind of works. Do not use in production!

export const isValidText = (text) => text.length >= 3;

export const isValidTitle = (text) => text.length >= 1;

export async function addRegister(ctx) {
  ctx.response.body = await ctx.nunjucks.render("register.html", {});
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function addLogin(ctx) {
  ctx.response.body = await ctx.nunjucks.render("login.html", {});
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function submitAddRegister(ctx) {
  const formData = await ctx.request.formData();
  const data = {
    vorname: formData.get("vorname"),
    nachname: formData.get("nachname"),
    email: formData.get("email"),
    passwort: formData.get("passwort"),

    //passwortKontrolle: formData.get("passwortKontrolle")
  };
  //console.log(data);

  if (data.vorname && data.nachname && data.email && data.passwort) {
    console.log("Add aufgerufen");
    model.addRegister(ctx.db, formData);
    ctx.redirect = new Response(null, {
      status: 302,
      headers: { Location: "login.html" },
    });
  } else {
    const errors = {};
    if (!data.vorname) errors.vorname = "Vorname zu kurz";
    if (!data.nachname) errors.nachname = "Nachname zu kurz";
    if (!data.email) errors.email = "E-Mail zu kurz";
    if (!data.passwort) errors.passwort = "Passwort zu kurz";
    ctx.response.body = await ctx.nunjucks.render("register.html", {
      form: data,
      errors: errors,
    });
    ctx.response.status = 303;
    ctx.response.headers["content-type"] = "text/html";
    return ctx;
  }
  return ctx;
}

export async function submitAddLogin(ctx) {
  const formData = await ctx.request.formData();
  const data = {
    email: formData.get("email"),
    passwort: formData.get("passwort"),
  };

  if (data.email && data.passwort) {
    console.log("Add aufgerufen");
    model.addLogin(formData);
    ctx.redirect = new Response(null, {
      status: 302,
      headers: { Location: "login.html" },
    });
  } else {
    const errors = {};
    if (!data.vorname) errors.vorname = "Vorname zu kurz";
    if (!data.nachname) errors.nachname = "Nachname zu kurz";
    if (!data.email) errors.email = "E-Mail zu kurz";
    if (!data.passwort) errors.passwort = "Passwort zu kurz";
    ctx.response.body = await ctx.nunjucks.render("register.html", {
      form: data,
      errors: errors,
    });
    ctx.response.status = 303;
    ctx.response.headers["content-type"] = "text/html";
    return ctx;
  }
  return ctx;
}
