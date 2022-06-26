import { ErrorBox } from "./ErrorBox";

export function BookForm({ book, error, id, onSubmit }) {
  return (
    <form onSubmit={onSubmit} id={id} className="flex flex-col gap-2">
      {error && <ErrorBox error={error} />}
      {book && <input type="hidden" name="id" value={book.id} />}
      <div className="rounded-md shadow-sm">
        <input
          type="text"
          name="title"
          className="appearance-none relative block w-full px-3 py-1 border rounded-md sm:text-3xl font-bold text-center border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
          placeholder="Titre"
          defaultValue={book?.title}
          required
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="rounded-md shadow-sm flex-1">
          <label className="uppercase text-xs ml-1" htmlFor="author">
            Auteur
          </label>
          <input
            type="text"
            name="author"
            className="appearance-none relative block w-full px-3 py-2 border rounded-md sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
            placeholder="Ficus"
            defaultValue={book?.author}
            required
          />
        </div>
        <div className="rounded-md shadow-sm w-32">
          <label className="uppercase text-xs ml-1">Année</label>
          <input
            type="number"
            min={1}
            name="year"
            className="appearance-none relative block w-full px-3 py-2 border rounded-md sm:text-sm border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
            defaultValue={book?.year}
            required
          />
        </div>
      </div>
    </form>
  );
}
