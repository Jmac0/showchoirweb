import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getHomePageData } from "../lib/getPages";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { formatOptions } from "../lib/toReactComponent";

export async function getStaticProps() {
  const data = await getHomePageData();
  const {
    fields: { title },
  } = data;
  // const bodyContent = data.fields.content;
  const {
    fields: { content },
  } = data;
  return { props: { title, content } };
}

type Props = {
  title: string;
  content: {};
};
const Home: NextPage<Props> = ({ title, content }) => {
  const [bodyTxt, setBodyTxt] = useState("");
  // convert contentful object to html ritch text
  // @ts-ignore
  const bodyHtml = documentToReactComponents(content, formatOptions);
  useEffect(() => {
    // set body text in here to solve hydration issue
    setBodyTxt(bodyHtml as any);
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Show Choir Surrey's premier musical theatre choir"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{bodyTxt}</main>

      <footer></footer>
    </div>
  );
};

export default Home;
