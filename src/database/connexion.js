import { resolve, dirname } from "node:path";
import Knex from "knex";
import fse from "fs-extra";
import { customAlphabet } from "nanoid";

export const db = setupDatabase();

export const createId = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  12
);

export async function setupDatabase() {
  const SQLITE_FILE_PATH = resolve("data", "database.sqlite");

  const knex = Knex({
    client: "better-sqlite3",
    connection: { filename: SQLITE_FILE_PATH },
    useNullAsDefault: true,
  });

  const dbAlreadyExists = fse.existsSync(SQLITE_FILE_PATH);

  await fse.ensureDir(dirname(SQLITE_FILE_PATH));

  if (!dbAlreadyExists) {
    console.log("-> Creating tables");

    await knex.schema.createTable("books", (booksTable) => {
      booksTable.text("id").primary().notNullable();
      booksTable.text("title").notNullable();
      booksTable.integer("year").notNullable();
      booksTable.text("author").defaultTo(null);
      // "ToBuy" | "ToRead" | "Reading" | "Read"
      booksTable.text("status").notNullable();
    });

    const books = knex("books");

    await books.insert({
      id: createId(),
      title: "Le Petit Prince",
      year: 1943,
      author: "Antoine de Saint-Exupéry",
      status: "Read",
    });

    await books.insert({
      id: createId(),
      title: "Harry Potter à l'école des sorciers",
      year: 1997,
      author: "J.K. Rowling",
      status: "Read",
    });

    await books.insert({
      id: createId(),
      title: "Harry Potter et la chambre des secrets",
      year: 1999,
      author: "J.K. Rowling",
      status: "Read",
    });

    await books.insert({
      id: createId(),
      title: "Harry Potter et le prisonnier d'Azkaban",
      year: 1999,
      author: "J.K. Rowling",
      status: "Read",
    });

    await books.insert({
      id: createId(),
      title: "Harry Potter et la coupe de feu",
      year: 2002,
      author: "J.K. Rowling",
      status: "Reading",
    });

    await books.insert({
      id: createId(),
      title: "Harry Potter et l'Ordre du phénix",
      year: 2003,
      author: "J.K. Rowling",
      status: "ToRead",
    });

    await books.insert({
      id: createId(),
      title: "Harry Potter et le Prince de sang-mêlé",
      year: 2005,
      author: "J.K. Rowling",
      status: "ToRead",
    });

    await books.insert({
      id: createId(),
      title: "Harry Potter et les reliques de la mort",
      year: 2007,
      author: "J.K. Rowling",
      status: "ToBuy",
    });

    await books.insert({
      id: createId(),
      title: "Le Hobbit",
      year: 1937,
      author: "J.R.R. Tolkien",
      status: "Read",
    });

    await books.insert({
      id: createId(),
      title: "Le Seigneur des anneaux",
      year: 1972,
      author: "J.R.R. Tolkien",
      status: "ToBuy",
    });

    console.log("-> Done");
  }

  return knex;
}
