import { NextPage } from 'next';
import { Footer } from '../../components/Footer';
import SignUpForm from '../../components/signUpForm/SignUpForm';
import { useSelector } from 'react-redux';
import { selectUrls } from '../../features/urlSlice';
import Head from 'next/head';
import { Nav } from '../../components/Nav';

const MonthlyMembershipDetail: NextPage = () => {
  const pathData = useSelector(selectUrls);
  return (
    <div className="flex flex-col w-full h-screen ">
      <Head>
        <title>Show Choir Monthly Membership</title>
        <meta
          name="description"
          content="Show Choir Surrey's premier musical theatre choir"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        <Nav pathData={pathData} />
      </div>
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default MonthlyMembershipDetail;

// TODO get static props
