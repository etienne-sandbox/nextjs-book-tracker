import { withIronSessionApiRoute } from "iron-session/next";
import { updateBookStatusById, findBookById } from "../../database";
import { sessionConfig } from "../../logic/session";
import { z } from "zod";
import { unauthorized } from "../../logic/utils";

const bodySchema = z.strictObject({
  bookId: z.string(),
  status: z.enum(["ToBuy", "ToRead", "Reading", "Read"]),
});

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.session.user) {
    return unauthorized(res);
  }
  const parsed = bodySchema.safeParse(req.body);
  if (parsed.success === false) {
    return res.status(400).json({
      status: 400,
      message: "Body validation error",
      error: "body-validation-error",
    });
  }
  const data = parsed.data;
  const { bookId, status } = data;
  const book = await findBookById(bookId);
  if (!book) {
    return res.status(404).json({
      status: 404,
      message: "Book not found",
      error: "book-not-found",
    });
  }
  await updateBookStatusById(bookId, status);
  return res.status(201).end();
}, sessionConfig);
