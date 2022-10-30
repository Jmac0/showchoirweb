import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getHomePageData, getPageData } from '../lib/getPages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { formatOptions } from '../lib/toReactComponent';
import { Nav } from '../components/Nav';

export async function getStaticProps() {
  const homePageData = await getHomePageData();
  const {
    fields: { title },
  } = homePageData;
  const {
    fields: { content },
  } = homePageData;
  /*get paths for each page from contentful*/
  const res = await getPageData();
  const { items } = res;
  const pathData = items.map(
    (item: {
      fields: { slug: string; displayText: string; order: number };
    }) => {
      return {
        slug: item.fields.slug,
        displayText: item.fields.displayText,
        order: item.fields.order,
      };
    },
  );

  return { props: { title, content, pathData } };
}

type Props = {
  title: string;
  content: {};
  pathData: [{ slug: string; displayText: string; order: number }];
};
const Home: NextPage<Props> = ({ title, content, pathData }) => {
  const [bodyTxt, setBodyTxt] = useState('');
  // convert contentful object to html rich text
  // @ts-ignore
  const bodyHtml = documentToReactComponents(content, formatOptions);
  useEffect(() => {
    // set body text in here to solve hydration issue
    setBodyTxt(bodyHtml as any);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Show Choir Surrey's premier musical theatre choir"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav pathData={pathData} />
      <main
        className={`container mx-auto flex flex-col items-center bg-amber-50`}
      >
        {bodyTxt}
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
