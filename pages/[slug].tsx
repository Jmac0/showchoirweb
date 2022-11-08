import React from 'react';
import { getPageData } from '../lib/getPages';
import Head from 'next/head';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

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

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const res = await getPageData();
  const { items } = res;
  // an array of strings
  const paths = items.map((item: { fields: { slug: string } }) => {
    return { params: { slug: item.fields.slug } };
  });
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
