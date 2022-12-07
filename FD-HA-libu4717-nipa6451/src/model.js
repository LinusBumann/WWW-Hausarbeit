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
  const db = new DB("data/notes.sqlite");
  const title = formData.get("title");
  const date = formData.get("date");
  const text = formData.get("text");
  db.query(`INSERT INTO notes (date, title, text) VALUES (?, ?, ?);`, [
    date,
    title,
    text,
  ]);
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
