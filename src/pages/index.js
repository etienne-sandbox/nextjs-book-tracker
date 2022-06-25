import { Layout } from "../components/Layout";
import Head from "next/head";
import { Fragment } from "react";

export default function Home() {
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
        </div>
      </Layout>
    </Fragment>
  );
}
