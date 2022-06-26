export const sessionConfig = {
  cookieName: "books-tracker-session",
  password: "ZebtMR6R72n1G3u5b6w3Tx3xvL91JuFp",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
