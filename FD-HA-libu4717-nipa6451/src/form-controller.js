import * as model from "./model.js";
import { debug as Debug } from "https://deno.land/x/debug/mod.ts";
import { userProfile } from "./controller.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
const debug = Debug("app:formController");

/*
Use browser and IDE side-by-side.
*/

// @KLUDGE: Kind of works. Do not use in production!

export const isValidText = (text) => text.length >= 3;

export const isValidTitle = (text) => text.length >= 1;

export async function addRegister(ctx, emailError, passwortError) {
  ctx.response.body = await ctx.nunjucks.render("register.html", {});
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
    passwortKontrolle: formData.get("passwortKontrolle"),
  };
  const pwVergleich = data.passwort === data.passwortKontrolle;
  const vorhandenerUser = await model.userExistiert(ctx.db, data.email);
  const errors = {};
  if (pwVergleich && !vorhandenerUser) {
    model.createSession(ctx.db, data.email, ctx.sessionID);
    model.addRegister(ctx.db, data);
    ctx.redirect = new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
    return ctx;
  } else {
    !pwVergleich && (errors.passwort = "Passwort stimmt nicht überein!");
    vorhandenerUser && (errors.email = "Email bereits vergeben!");
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

export async function addLogin(ctx) {
  ctx.response.body = await ctx.nunjucks.render("login.html", {});
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function submitAddLogin(ctx) {
  const formData = await ctx.request.formData();
  const data = {
    email: formData.get("email"),
    passwort: formData.get("passwort"),
  };
  const nutzerPasswort = await model.getNutzerPasswort(ctx.db, data.email);
  console.log("Hashwert:", nutzerPasswort);
  const gleichesPasswort = await bcrypt.compare(data.passwort, nutzerPasswort);
  console.log("uncryptPW:", data.passwort);
  if (gleichesPasswort) {
    model.createSession(ctx.db, data.email, ctx.sessionID);
    ctx.redirect = new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
    return ctx;
  } else {
    const errors = {
      passwort: "Falsches Passwort!",
    };
    ctx.response.body = await ctx.nunjucks.render("login.html", {
      form: data,
      errors: errors,
    });
    ctx.response.status = 303;
    ctx.response.headers["content-type"] = "text/html";
    return ctx;
  }
}

export async function submitAddSchuhBearbeitung(ctx) {
  const formData = await ctx.request.formData();
  //const schuhID = model.getSchuhID(ctx.db, ctx.params.schuhID);
  const data = {
    //schuhID: schuhID,
    schuhTitel: formData.get("schuhTitel"),
    schuhImageLink: formData.get("schuhImage"),
    schuhInfoText: formData.get("schuhInfoText"),
    schuhKommentar: formData.get("schuhKommentar"),
  };

  const bearbeiteterEintrag = await model.bearbeiteSchuheintrag(ctx.db, data);
}
