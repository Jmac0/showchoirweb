import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ReactMarkdown from 'react-markdown';
import { formatOptions } from '../lib/toReactComponent';
import { getPageData } from '../lib/getPages';
import Head from 'next/head';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

type Props = {
  pathData: [{ slug: string; displayText: string; order: number }];
  currentPage: any;
};

export default function Slug({ currentPage, pathData }: Props) {
  const router = useRouter();
  const { title, content, flexiInfo } = currentPage;
  const [bodyTxt, setBodyTxt] = useState('');

  // convert contentful object to html rich text
  // @ts-ignore
  const bodyHtml = documentToReactComponents(content, formatOptions);
  useEffect(() => {
    // set body text in here to solve hydration issue
    setBodyTxt(bodyHtml as any);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Show Choir Surrey's premier musical theatre choir"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav pathData={pathData} />
      <main className=" h-3/4 flex flex-col items-center  bg-amber-50">
        {title}
        {router.query.slug === 'show-choir-membership' ? (
          <div>
            {bodyTxt}
            <ReactMarkdown>{flexiInfo}</ReactMarkdown>
          </div>
        ) : (
          <p>Not Member page</p>
        )}
      </main>

      <Footer />
    </div>
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
