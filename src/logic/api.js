// Dans ce fichiers on définit les fonctions qui seront
// utilisées pour appeler les routes API depuis les composants

/**
 * Appel api en POST avec un body JSON
 * @param {string} path
 * @param {*} [data]
 * @returns {Promise<Response>}
 */
export async function jsonPost(path, data) {
  const response = await fetch(path, {
    method: "POST",
    headers: data
      ? {
          "Content-Type": "application/json",
        }
      : {},
    body: data ? JSON.stringify(data) : null,
  });
  if (response.ok !== true) {
    // is response is json, throw the data
    const json = await response.json();
    throw json;
  }
  return response;
}

/**
 * @param {{ username: string; password: string }}
 * @returns {Promise<void>}
 */
export async function login({ username, password }) {
  return jsonPost("/api/login", { username, password });
}

/**
 * @returns {Promise<void>}
 */
export async function logout() {
  return jsonPost("/api/logout");
}

/**
 * @param {{ bookId: string; status: string }} params
 * @returns {Promise<void>}
 */
export async function updateBookStatus({ bookId, status }) {
  return jsonPost("/api/update-status", { bookId, status });
}

/**
 * Create or update a book
 */
export async function book({ id, author, title, year }) {
  return jsonPost("/api/book", { id, author, title, year });
}

export async function deleteBook(bookId) {
  return jsonPost("/api/delete-book", { bookId });
}
