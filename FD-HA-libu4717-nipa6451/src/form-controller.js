import * as model from "./model.js";
import { debug as Debug } from "https://deno.land/x/debug/mod.ts";
import { userProfile } from "./controller.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
const debug = Debug("app:formController");
import * as mediaTypes from "https://deno.land/std/media_types/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

/*
Use browser and IDE side-by-side.
*/

// @KLUDGE: Kind of works. Do not use in production!

export const isValidText = (text) => text.length >= 3;

export const isValidTitle = (text) => text.length >= 1;

export async function logoutUser(ctx) {
  model.deleteSession(ctx.db, ctx.sessionID);
  ctx.redirect = new Response(null, {
    status: 302,
    headers: { Location: "/login" },
  });
  return ctx;
}

export async function addRegister(ctx) {
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
  //console.log("Hashwert:", nutzerPasswort);
  const gleichesPasswort = await bcrypt.compare(data.passwort, nutzerPasswort);
  //console.log("uncryptPW:", data.passwort);
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
  console.log("Schuh wurde bearbeitet");
  const formData = await ctx.request.formData();
  const schuhID = model.getSchuhID(ctx.db, ctx.params.schuhID);
  const data = {
    schuhTitel: formData.get("schuhTitel"),
    schuhImageLink: formData.get("schuhImage"),
    schuhInfoText: formData.get("schuhInfoText"),
    schuhKommentar: formData.get("schuhKommentar"),
    schuhID: Number(schuhID),
  };
  model.bearbeiteSchuheintrag(ctx.db, data);
  ctx.redirect = new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
}

export async function submitAddSchuheHinzufügen(ctx) {
  console.log("Schuh wurde hinzugefügt");
  const formData = await ctx.request.formData();
  const data = {
    schuhTitel: formData.get("schuhTitel"),
    schuhBaureihe: formData.get("baureihe"),
    schuhImageLink: formData.get("schuhImage"),
    schuhInfoText: formData.get("schuhInfoText"),
    schuhKommentar: formData.get("schuhKommentar"),
  };

  const errors = await validateImage(data.schuhImageLink);

  if (errors) {
    formData.schuhImage = undefined;
    ctx.response.body = ctx.nunjucks.render("schuhHinzufügen.html", {
      errors: errors,
    });
    ctx.response.status = 200;
    ctx.response.headers["content-type"] = "text/html";
    return ctx;
  } else {
    const filename = generateFilename(data.schuhImageLink);
    const destFile = await Deno.open(
      path.join(Deno.cwd(), "assets", filename),
      { create: true, write: true, truncate: true }
    );
    console.log("Deno CWD", Deno.cwd(), "DENO END");
    await data.schuhImageLink.stream().pipeTo(destFile.writable);
    data.schuhImageLink = filename;
    console.log(data.schuhImageLink);
    model.addSchuh(ctx.db, data);
    ctx.redirect = new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
    return ctx;
  }
}

function validateImage(file) {
  if (!file) return "Bild ist erforderlich.";
  if (file.size == 0) return "Bild ist erforderlich";
  if (isMimetypeOk(file.type)) return false;
  return "Dateiformat nicht zulässig.";
}

const isMimetypeOk = (type) => {
  if (type.substr(type.length - 4) === "jpeg") return true;
  if (type.substr(type.length - 3) === "png") return true;
  if (type.substr(type.length - 3) === "svg") return true;
};

export function generateFilename(file) {
  return (
    "/Bilder/" + crypto.randomUUID() + "." + mediaTypes.extension(file.type)
  );
}
