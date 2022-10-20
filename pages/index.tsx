import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getHomepageData } from "../lib/homePageData";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export async function getStaticProps() {
  const data = await getHomepageData();
  console.log(data.fields.content.content[1]);
  const {
    fields: { title },
  } = data;
  // const bodyContent = data.fields.content;
  const {
    fields: { content },
  } = data;
  return { props: { title, content } };
}

const formatOptions = {
  renderNode: {
    [BLOCKS.UL_LIST]: (node: any, children: any[]) => {
      return (
        <ul>
          {children.map((item: any) => (
            <li key={item.key}>{item.props.children[0].props.children[0]}</li>
          ))}
        </ul>
      );
    },
  },
};

type Props = {
  title: string;
  content: any;
};
const Home: NextPage<Props> = ({ title, content }) => {
  const [bodyTxt, setBodyTxt] = useState("");
  // convert contentful object to html ritch text
  // @ts-ignore
  const bodyHtml = documentToReactComponents(content, formatOptions);
  useEffect(() => {
    // set body text in here to solve hydration issue
    setBodyTxt(bodyHtml as any);
  }, [bodyHtml]);

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

      <main>
        <p>{bodyTxt}</p>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
