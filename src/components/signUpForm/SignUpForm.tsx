import React from 'react';
import { useSelector } from 'react-redux';
import { selectUrls } from '../../features/urlSlice';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
function SignUpForm() {
  const pathData = useSelector(selectUrls);
  return (
    <form className="relative flex flex-col ">
      <input type="text" />
    </form>
  );
}

export default SignUpForm;
