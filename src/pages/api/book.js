import { withIronSessionApiRoute } from "iron-session/next";
import { findBookById, insertBook, updateBookById } from "../../database";
import { sessionConfig } from "../../logic/session";
import { z } from "zod";
import { unauthorized } from "../../logic/utils";

/**
 * Créé ou mettre à jour un livre
 */

const bodySchema = z.strictObject({
  id: z.string().optional(),
  title: z.string(),
  author: z.string(),
  year: z.number().int().min(1),
});

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.session.user) {
    return unauthorized(res);
  }
  const parsed = bodySchema.safeParse(req.body);
  if (parsed.success === false) {
    res.status(400).json({
      status: 400,
      message: "Body validation error",
      error: "body-validation-error",
      zodError: parsed.error.errors,
    });
    return;
  }
  const data = parsed.data;
  const { author, title, year } = data;
  if (data.id) {
    // update
    const book = await findBookById(data.id);
    if (!book) {
      return res.status(404).json({
        status: 404,
        message: "Book not found",
        error: "book-not-found",
      });
    }
    await updateBookById(data.id, { author, title, year });
    return res.status(204).end();
  }
  // create
  await insertBook({ author, title, year });
  return res.status(201).end();
}, sessionConfig);
