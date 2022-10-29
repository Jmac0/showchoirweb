import React from 'react';
import { getPageData } from '../lib/getPages';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  content: {};
  title: string;
  slug: string;
  displayText: [{ slug: string; displayText: string }];
  items: [];
  currentPage: any;
};

export default function Slug({ currentPage, items }: Props) {
  const { title } = currentPage;
  return (
    <>
      <Head>
        <title>{}</title>
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

          {items.map(
            (item: { fields: { slug: string; displayText: string } }) => (
              <Link key={item.fields.slug} href={item.fields.slug}>
                <a className="text-lightBlack font-heading px-3 hover:underline text-2xl">
                  {item.fields.displayText}
                </a>
              </Link>
            ),
          )}
        </div>
      </nav>

      <main>{title}</main>

      <footer></footer>
    </>
  );
}

export async function getStaticPaths() {
  const res = await getPageData();
  const { items } = res;
  const slugs = items.map((item: { fields: { slug: string } }) => {
    return item.fields.slug;
  });
  const paths = slugs.map((s: { slug: any }) => ({ params: { slug: s } }));
  return {
    paths,
    fallback: true,
  };
}

type Paths = {
  params: { slug: string };
};

export async function getStaticProps({ params }: Paths) {
  const res = await getPageData();
  const { items } = res;
  const match = items.find((item: any) => item.fields.slug === params.slug);
  const currentPage = match.fields;
  return {
    props: { currentPage, items },
  };
}
