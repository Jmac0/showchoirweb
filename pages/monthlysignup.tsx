import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';
import { getPageData } from '../lib/getPages';
export async function getServerSideProps() {
  const res = await getPageData();
  console.log(res);
  return { props: res };
}
const GocardlesSignupForm: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="container m-10">
        <p>This is a form to sign up top Go Cardless</p>
      </div>
      <Footer />
    </>
  );
};

export default GocardlesSignupForm;
