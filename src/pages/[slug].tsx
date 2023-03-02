import React, { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { formatOptions } from '../lib/toReactComponent';
import { getPageData } from '../lib/getPages';
import { setUrlData } from '../features/urlSlice';
import Head from 'next/head';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { MembershipOptionInfo } from '../components/MembershipOptionInfo';
import { wrapper } from '../store/store';
import { BLOCKS } from '@contentful/rich-text-types';
import MembershipOptionsContainer from '../components/MembershipOptionsContainer';

type Props = {
  pathData: [{ slug: string; displayText: string; order: number }];
  currentPage: {
    title: string;
    content: { data: {}; content: []; nodeType: BLOCKS.DOCUMENT };
    flexiInfo: string;
    monthlyInfo: string;
  };
};

export default function Slug({ currentPage, pathData }: Props) {
  const { title, content, flexiInfo, monthlyInfo } = currentPage;

  const [bodyTxt, setBodyTxt] = useState('');
  useEffect(() => {
    // convert contentful object to html rich text
    // set body text in here to solve hydration issue
    const bodyHtml = documentToReactComponents(content, formatOptions);
    setBodyTxt(bodyHtml as string);
  }, [content]);

  return (
    <div className="flex flex-col">
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
        className={`w-screen flex p-2.5 flex-col items-center bg-transparent`}
      >
        <div className="flex flex-col w-9/12 text-center pb-10">{bodyTxt}</div>
        {/*component displaying membership option boxes */}
        {flexiInfo && (
          <MembershipOptionsContainer
            flexiInfo={flexiInfo}
            monthlyInfo={monthlyInfo}
          />
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
  params: { slug: string; pathData: string } | null;
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }: any) => {
      const res = await getPageData();
      const { items } = res;
      const pathData = items.map((item: any) => {
        return {
          slug: item.fields.slug,
          displayText: item.fields.displayText,
          order: item.fields.order,
        };
      });
      store.dispatch(setUrlData(pathData));
      const match = items.find((item: any) => item.fields.slug === params.slug);
      const currentPage = match.fields;
      return {
        props: { currentPage, pathData },
      };
    },
);

// export async function getStaticProps({ params }: Paths) {
//   const res = await getPageData();
//   const { items } = res;
//   const pathData = items.map((item: any) => {
//     return {
//       slug: item.fields.slug,
//       displayText: item.fields.displayText,
//       order: item.fields.order,
//     };
//   });
//   const match = items.find((item: any) => item.fields.slug === params.slug);
//   const currentPage = match.fields;
//   return {
//     props: { currentPage, pathData },
//   };
// }
