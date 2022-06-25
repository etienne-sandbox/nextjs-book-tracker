import { db, createId } from "./connexion.js";

/**
 * L'utilisateur de l'application.
 * On utilise des données statiques pour simplifier le code.
 */
const USER = { username: "user", password: "pass" };

/**
 * Permet d'authentifier un utilisateur
 * @param {string} username
 * @param {string} password
 * @returns {false | { username: string,  password: string }}
 */
export async function findUser(username, password) {
  if (username === USER.username && password === USER.password) {
    return USER;
  }
  return null;
}

/**
 * @typedef {"ToBuy" | "ToRead" | "Reading" | "Read"} BookStatus
 */

/**
 * @typedef {{
 *   id: string;
 *   title: string;
 *   year: number;
 *   author: string;
 *   status: BookStatus;
 * }} Book
 */

/**
 * Récupère la liste des livres
 * @returns {Promise<Array<Book>>}
 */
export async function findAllBooks() {
  const d = await db;
  const books = await d.select("*").from("books");
  return books;
}

/**
 * Trouve un livre par son id
 * @param {string} bookId
 * @returns {Promise<Book>}
 */
export async function findBookById(bookId) {
  const d = await db;
  const book = await d.select("*").from("books").where("id", bookId).first();
  return book;
}

/**
 * @typedef {{ title: string; year: number; author: string; status: BookStatus; }} BookData
 */

/**
 * Mets à jour un livre
 * @param {string} bookId
 * @param {BookData} data
 * @returns {Promise<void>}
 */
export async function updateBookById(bookId, data) {
  const d = await db;
  await d.update(data).from("books").where("id", bookId);
}

/**
 * Mets à jour le status d'un livre
 * @param {string} bookId
 * @param {BookStatus} status
 * @returns {Promise<void>}
 */
export async function updateBookStatusById(bookId, status) {
  const d = await db;
  await d.update({ status }).from("books").where("id", bookId);
}

/**
 * Ajoute un livre
 * @param {BookData} data
 * @returns {Promise<void>}
 */
export async function insertBook(data) {
  const d = await db;
  await d
    .insert({
      id: createId(),
      status: "ToBuy",
      ...data,
    })
    .into("books");
}

/**
 * Supprime un livre
 * @param {string} bookId
 * @returns {Promise<void>}
 */
export async function removeBook(bookId) {
  const d = await db;
  const book = await findBookById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  await d.delete().from("books").where("id", bookId);
}
