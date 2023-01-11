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

export const getIndexValues = (db) => {
  const query = `SELECT * FROM hersteller`;
  return db.queryEntries(query);
};

export const getHersteller = (db, herstellerID) => {
  const query = `SELECT * FROM baureihen  WHERE herstellerID = :herstellerID`;
  return db.queryEntries(query, { herstellerID: herstellerID });
};

export const getSchuh = (db, baureiheID) => {
  const query = `SELECT * FROM schuh WHERE baureiheID = :baureiheID`;
  return db.queryEntries(query, { baureiheID: baureiheID });
};

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
export const addRegister = (db, formData) => {
  const vorname = formData.get("vorname");
  const nachname = formData.get("nachname");
  const email = formData.get("email");
  const passwort = formData.get("passwort");
  db.query(
    `INSERT INTO userdata (vorname, nachname, email, passwort) VALUES (?, ?, ?, ?);`,
    [vorname, nachname, email, passwort]
  );
};

/*export const addLogin = (formData) => {
  const db = new DB("data/userdata.sqlite");
  const email = formData.get("email");
  const passwort = formData.get("passwort");
  db.query(
    "SELECT * FROM userdata WHERE email = ? AND passwort = ?",
    [username, passwort],
    function (error, results) {
      if (error) {
        //res.send({ error: "An error occurred" });
      } else if (results.length > 0) {
        // login was successful, generate an authorization token
        //const authToken = generateAuthToken();
        //res.send({ authToken: authToken });
      } else {
        // res.send({ error: "Invalid login credentials" });
      }
    }
  );
  db.close();
};*/

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
