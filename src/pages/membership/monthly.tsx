import { NextPage } from 'next';
import { Footer } from '../../components/Footer';
import SignUpForm from '../../components/signUpForm/SignUpForm';

const MonthlyMembershipDetail: NextPage = () => {
  return (
    <>
      <div className="container m-10">
        <p>This is a form to sign up top Go Cardless</p>
      </div>
      <SignUpForm />
      <Footer />
    </>
  );
};

export default MonthlyMembershipDetail;

// TODO get static props for text and useSelector for menu
