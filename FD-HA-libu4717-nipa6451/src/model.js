import { debug as Debug } from "https://deno.land/x/debug/mod.ts";

const debug = Debug("app:model");
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

/**
 *  All these functions make more sense with a database.
 *  ;-)
 */

/**
 * Loads all notes.
 * @param {Object[]} data – All notes.
 * @returns {Object[]} – All notes.
 */
export const index = (data) => data;

/**
 * Get one note.
 * @param {Object[]} data – All notes.
 * @param {number} id – Id of a note
 * @returns {Object|undefined} – The note or undefined.
 */
export const getById = (data, id) => data[id];

/**
 * Add a note.
 * @param {Object[]} data – All notes.
 * @param {Object} formData – Note to add.
 */
export const add = (formData) => {
  const db = new DB("data/userdata.sqlite");
  const vorname = formData.get("vorname");
  console.log(vorname);
  const nachname = formData.get("nachname");
  const email = formData.get("email");
  const passwort = formData.get("passwort");
  db.query(
    `INSERT INTO userdata (vorname, nachname, email, passwort) VALUES (?, ?, ?, ?);`,
    [vorname, nachname, email, passwort]
  );
  db.close();
};

/**
 * Update a note.
 * @param {Object[]} data – All notes.
 * @param {Object} formData – Notedata for update to.
 * @param {number} id – Id of a note
 */
export const update = (data, formData, id) => {
  debug("update #", id);
  data[id] = formData;
};
