import { Layout } from "../components/Layout";
import Head from "next/head";
import { Fragment } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "../logic/session";
import { findAllBooks } from "../database/index";
import useMutation from "use-mutation";
import * as api from "../logic/api";
import { ArrowDown, PlusCircle, SignOut } from "phosphor-react";
import { useReload } from "../hooks/useReload";
import Link from "next/link";
import { BookItem } from "../components/BookItem";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }
    return { props: { books: await findAllBooks() } };
  },
  sessionConfig
);

export default function Home({ books }) {
  const reload = useReload();

  const [logout, logoutInfo] = useMutation(api.logout, { onSettled: reload });

  return (
    <Fragment>
      <Head>
        <title>Mes livres</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-stretch gap-4">
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Mes Livres
          </h1>
          <div className="flex flex-col items-stretch gap-2">
            {books.length === 0 ? (
              <div className="flex flex-col gap-3 items-center py-4 bg-pink-100 rounded text-slate-700">
                <p className="font-bold">Ajoutes ton premier livre !</p>
                <ArrowDown className="w-6 h-6" />
              </div>
            ) : (
              books.map((book) => <BookItem key={book.id} book={book} />)
            )}
          </div>
          <Link href="/new">
            <a className="shadow-md rounded text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white self-center gap-3 p-2 pr-6 uppercase tracking-wide flex flex-row items-center outline-offset-2">
              <PlusCircle className="w-6 h-6" weight="regular" />
              Ajouter un livre
            </a>
          </Link>
          <button
            onClick={logout}
            className="text-center underline rounded-md self-center px-4 text-red-900 hover:bg-red-100 py-1 -my-1 flex flex-row items-center gap-2 outline-red-700"
          >
            <SignOut className="w-5 h-5" weight="bold" />
            {logoutInfo.status === "running"
              ? "Déconnexion..."
              : "Se déconnecter"}
          </button>
        </div>
      </Layout>
    </Fragment>
  );
}
