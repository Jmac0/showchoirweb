import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from '../components/Nav';
import type { AppState } from '../store/store';
const GocardlessRedirectPage = () => {
  const pathData = useSelector((state: AppState) => state.url.urls);
  return (
    <div>
	<Nav pathData={pathData} />
      <p>GC Re-direct</p>
    </div>
  );
};

export default GocardlessRedirectPage;

