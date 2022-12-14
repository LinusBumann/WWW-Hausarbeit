import { debug as Debug } from "https://deno.land/x/debug/mod.ts";

const debug = Debug("app:model");
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
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

export const createSession = async (db, email, sessionID) => {
  await db.query(
    `INSERT INTO sessions (sessionID, userEmail, expirationDate) VALUES (?, ?, ?);`,
    [sessionID, email, Date.now() + 1000 * 60 * 60 * 24 * 7]
  );
};

export const getSession = async (db, sessionID) => {
  let session = db.query(`SELECT * FROM sessions WHERE sessionID = ?;`, [
    sessionID,
  ]);

  if (session.length == 0) return false;
  session = {
    sessionID: session[0][0],
    email: session[0][1],
    expirationDate: session[0][2],
  };

  if (session.expirationDate < Date.now()) {
    await db.query(`DELETE FROM sessions WHERE sessionID = ?;`, [sessionID]);
    return false;
  }
  return session;
};

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
export const getSchuhID = (db, schuhID) => {
  const query = `SELECT * FROM schuh WHERE schuhID = :schuhID`;
  return db.queryEntries(query, { schuhID: schuhID })[0];
};

export const bearbeiteSchuheintrag = async (db, data) => {
  await db.query(
    `UPDATE schuh SET schuhName = ?, schuhImageLink = ?, schuhInfoText = ? WHERE ;`,
    [data.schuhTitel, data.schuhImageLink, data.schuhInfoText]
  );
};

/**
 * Get one note.
 * @param {Object[]} data – All notes.
 * @param {number} id – Id of a note
 * @returns {Object|undefined} – The note or undefined.
 */
export const getById = (data, id) => {
  return data.find((item) => item.file_name === id);
};

/**
 * Add a note.
 * @param {Object[]} data – All notes.
 * @param {Object} formData – Note to add.
 */
export const addRegister = async (db, formData) => {
  const passwortCrypt = await bcrypt.hash(formData.passwort);

  await db.query(
    `INSERT INTO userdata (vorname, nachname, email, passwort) VALUES (?, ?, ?, ?);`,
    [formData.vorname, formData.nachname, formData.email, passwortCrypt]
  );
  let angemeldeterUser = await db.query(
    `SELECT * FROM userData WHERE email = ?;`,
    [formData.email]
  );
  angemeldeterUser = {
    email: userData[0][3],
    passwortCrypt: userData[0][4],
  };
  return angemeldeterUser;
};

export const userExistiert = async (db, email) => {
  const nutzerEmail = await db.query(
    `SELECT * FROM userData WHERE email = ?;`,
    [email]
  );
  if (nutzerEmail.length == 0) return false;
  return true;
};

export const getNutzerPasswort = async (db, email) => {
  const nutzerEmail = await db.query(
    `SELECT * FROM userData WHERE email = ?;`,
    [email]
  );
  if (nutzerEmail.length == 0) return false;

  return nutzerEmail[0][4];
};

export const getNutzer = async (db, email) => {
  let nutzer = await db.query(`SELECT * FROM userData WHERE email = ?;`, [
    email,
  ]);
  if (nutzer.length == 0) return false;
  nutzer = {
    vorname: nutzer[0][1],
    nachname: nutzer[0][2],
    email: nutzer[0][3],
  };

  return nutzer;
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
