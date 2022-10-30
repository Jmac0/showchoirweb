import React from 'react';
import { getPageData } from '../lib/getPages';
import Head from 'next/head';
import { Nav } from '../components/Nav';

type Props = {
  pathData: [{ slug: string; displayText: string; order: number }];
  currentPage: any;
};

export default function Slug({ currentPage, pathData }: Props) {
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
      <Nav pathData={pathData} />
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
  const pathData = items.map((item: any) => {
    return {
      slug: item.fields.slug,
      displayText: item.fields.displayText,
      order: item.fields.order,
    };
  });
  const match = items.find((item: any) => item.fields.slug === params.slug);
  const currentPage = match.fields;
  return {
    props: { currentPage, pathData },
  };
}
