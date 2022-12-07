import * as model from "./model.js";
import { debug as Debug } from "https://deno.land/x/debug/mod.ts";

const debug = Debug("app:formController");

/*
Use browser and IDE side-by-side.
*/

// @KLUDGE: Kind of works. Do not use in production!
export const isValidDate = (date) => {
  const test = new Date(date);
  return test != "Invalid Date" && date.length >= 10;
};

export const isValidText = (text) => text.length >= 3;

export const isValidTitle = (text) => text.length >= 1;

export async function add(ctx) {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, 16);

  const data = { date: localISOTime };
  ctx.response.body = await ctx.nunjucks.render("form.html", { form: data });
  ctx.response.status = 200;
  ctx.response.headers["content-type"] = "text/html";
  return ctx;
}

export async function submitAdd(ctx) {
  const formData = await ctx.request.formData();
  const data = {
    title: formData.get("title"),
    date: formData.get("date"),
    text: formData.get("text"),
  };

  if (data.title && data.date && data.text) {
    model.add(formData);
    ctx.redirect = new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  } else {
    const errors = {};
    if (!data.title) errors.title = "Title zu Kurz";
    if (!data.date) errors.date = "Datum falsch";
    if (!data.text) errors.text = "Text zu Kurz";
    ctx.response.body = await ctx.nunjucks.render("form.html", {
      form: data,
      errors: errors,
    });
    ctx.response.status = 303;
    ctx.response.headers["content-type"] = "text/html";
    return ctx;
  }
  return ctx;
}
