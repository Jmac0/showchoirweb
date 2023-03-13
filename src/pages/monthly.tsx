import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Footer } from '../components/Footer';
import NewMemberSignUpForm from '../components/NewMemberSignUpForm/NewMemberSignUpForm';
import { useSelector } from 'react-redux';
import { selectUrls } from '../features/urlSlice';
import Head from 'next/head';
import { Nav } from '../components/Nav';
import useHttp from '../components/hooks/useHttp';
const MonthlyMembershipDetail: NextPage = () => {
  const router = useRouter();
  const pathData = useSelector(selectUrls);
  const {
    loading,
    message,
    setMessage,
    setLoading,
    setResponseData,
    sendRequest,
    responseData,
    showUserMessage,
    setShowUserMessage,
    isErrorMessage,
    setIsErrorMessage,
  } = useHttp({
    url: '/api/members/addNewSignUpToDb',
    method: 'POST',
    withCredentials: false,
  });
  useEffect(() => {
    if (responseData.authorisation_url) {
      setMessage('Redirecting');
      router.push(responseData.authorisation_url);
    }

    return () => {
      setResponseData({ authorisation_url: '' });
    };
  }, [responseData.authorisation_url, setMessage, router, setResponseData]);

  const submitForm = async (data: any) => {
    await sendRequest({ data });
  };

  console.log('URL:', responseData);
  return (
    <>
      <Head>
        <title>Show Choir Monthly Membership</title>
        <meta
          name="description"
          content="Show Choir Surrey's premier musical theatre choir"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <Nav pathData={pathData} />
        {/*Add margin top to accommodate menu*/}
        <div className="mt-16 flex flex-col items-center">
          {/*Props for message component passed down to parent  */}
          <NewMemberSignUpForm
            loading={loading}
            submitForm={submitForm}
            isErrorMessage={isErrorMessage}
            message={message}
            showUserMessage={showUserMessage}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MonthlyMembershipDetail;

// TODO get static props
