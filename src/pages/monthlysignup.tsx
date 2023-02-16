import { NextPage } from 'next';
import { Footer } from '../components/Footer';

const GocardlesSignupForm: NextPage = () => {
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
