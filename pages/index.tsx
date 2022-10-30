import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getHomePageData, getPageData } from '../lib/getPages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { formatOptions } from '../lib/toReactComponent';

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
  const linkData = items.map(
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
  //onst paths = slugs.map((s: { slug: any }) => s);

  return { props: { title, content, linkData } };
}

type Props = {
  title: string;
  content: {};
  linkData: [{ slug: string; displayText: string; order: number }];
};
const Home: NextPage<Props> = ({ title, content, linkData }) => {
  const [bodyTxt, setBodyTxt] = useState('');
  const sortedItems = linkData.sort((a, b) => (a.order < b.order ? -1 : 1));
  console.log(linkData);
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
      <nav>
        {/*desktop nav container*/}
        <div className="hidden h-28 from-lightGold flex-row w-full justify-center items-center bg-gradient-to-b to-gold md:flex">
          <Link href="/">
            <a className="text-lightBlack font-heading px-3 hover:underline text-2xl">
              Home
            </a>
          </Link>

          {sortedItems.map((path) => (
            <Link key={path.slug} href={path.slug}>
              <a className="text-lightBlack font-heading px-3 hover:underline text-2xl">
                {path.displayText}
              </a>
            </Link>
          ))}
        </div>
      </nav>
      <main className={`container flex flex-col items-center bg-amber-50`}>
        {bodyTxt}
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
