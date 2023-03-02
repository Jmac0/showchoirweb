import { NextPage } from 'next';
import { Footer } from '../../components/Footer';
import NewMemberSignUpForm from '../../components/NewMemberSignUpForm/NewMemberSignUpForm';
import { useSelector } from 'react-redux';
import { selectUrls } from '../../features/urlSlice';
import Head from 'next/head';
import { Nav } from '../../components/Nav';

const MonthlyMembershipDetail: NextPage = () => {
  const pathData = useSelector(selectUrls);
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
        <div className="flex flex-col items-center mt-16">
          <NewMemberSignUpForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MonthlyMembershipDetail;

// TODO get static props
