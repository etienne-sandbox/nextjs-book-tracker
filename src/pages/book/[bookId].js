import { format } from "date-fns";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import { ArrowLeft, FloppyDisk, Pencil, Trash } from "phosphor-react";
import { Layout } from "../../components/Layout";
import { findBookById } from "../../database";
import { sessionConfig } from "../../logic/session";
import fr from "date-fns/locale/fr";
import { useState, useId, Fragment } from "react";
import * as api from "../../logic/api";
import useMutation from "use-mutation";
import { useReload } from "../../hooks/useReload";
import { BookForm } from "../../components/BookForm";
import { useRouter } from "next/router";
import Head from "next/head";
import { frequencyText } from "../../logic/utils";
import { StatusSelect } from "../../components/StatusSelect";
import { StatusIcon } from "../../components/StatusIcon";

function formatFr(data, pattern) {
  return format(data, pattern, { locale: fr });
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }
    const { bookId } = context.params;
    const book = await findBookById(bookId);
    if (!book) {
      return { notFound: true };
    }
    return { props: { book } };
  },
  sessionConfig
);

export default function Book({ book }) {
  const reload = useReload();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const formId = useId();

  const [updateBook, updateBookInfos] = useMutation(api.book, {
    onSettled: reload,
    onSuccess: () => setEditing(false),
  });

  const [deleteBook, deleteBookInfos] = useMutation(api.deleteBook, {
    onSuccess: () => {
      router.push("/");
    },
  });

  const [updateBookStatus] = useMutation(api.updateBookStatus, {
    onSettled: reload,
  });

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    updateBook({
      ...data,
      year: parseInt(data.year, 10),
    });
  }

  return (
    <Fragment>
      <Head>
        <title>{book.title} - Livres</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-stretch gap-6">
          <div className="flex flex-row gap-4 justify-between">
            <Link href="/">
              <a className="flex flex-row items-center gap-2 hover:bg-blue-200 rounded px-4 py-1 hover:text-blue-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </a>
            </Link>
            {editing ? (
              <button
                key="save"
                className="flex flex-row items-center gap-2 rounded px-4 py-1 hover:bg-blue-200 hover:text-blue-900"
                type="submit"
                form={formId}
                disabled={updateBookInfos.status === "running"}
              >
                <FloppyDisk className="w-5 h-5" />
                Enregistrer
              </button>
            ) : (
              <button
                key="edit"
                className="flex flex-row items-center gap-2 rounded px-4 py-1 hover:bg-blue-200 hover:text-blue-900"
                onClick={() => setEditing(true)}
                type="button"
              >
                <Pencil className="w-5 h-5" />
                Modifier
              </button>
            )}
          </div>
          {editing ? (
            <BookForm
              id={formId}
              error={updateBookInfos.error}
              onSubmit={handleSubmit}
              book={book}
            />
          ) : (
            <div className="flex flex-col gap-1">
              <h1 className="text-center text-3xl font-extrabold text-gray-900">
                {book.title}
              </h1>
              <p className="italic font-light text-slate-500 text-center">
                {book.year} - {book.author}
              </p>
            </div>
          )}
          <div className="flex flex-row justify-center items-center gap-4 h-10 group">
            <StatusIcon status={book.status} />
            <p className="text-xl">Status</p>
            <StatusSelect
              status={book.status}
              onChange={(status) => {
                updateBookStatus({ bookId: book.id, status });
              }}
            />
          </div>
          <button
            onClick={() => {
              if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
                deleteBook(book.id);
              }
            }}
            className="text-center underline rounded-md self-center px-4 text-red-900 hover:bg-red-100 py-1 -my-1 flex flex-row items-center gap-2"
          >
            <Trash className="w-5 h-5" weight="bold" />
            Supprimer ce livre
          </button>
        </div>
      </Layout>
    </Fragment>
  );
}
