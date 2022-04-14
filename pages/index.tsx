import type { NextPage } from "next";
import Head from "next/head";

import Tool from "components/home/Tool";
import Content from "components/home/Content";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Finda Next Board</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col px-4 mt-8">
        <Tool />
        <Content />
      </div>
    </div>
  );
};

export default Home;
