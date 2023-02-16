import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPageData } from '../lib/getPages';
import { setUrlData } from '../features/urlSlice';
// @ts-ignore
export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // get URL data from Contentful
    const getUrls = async () => {
      const res = await getPageData();
      const { items } = res;
      const pathData = items.map((item: any) => {
        return {
          slug: item.fields.slug,
          displayText: item.fields.displayText,
          order: item.fields.order,
        };
      });
      // set URL data here, so it's available to all pages through Redux even if navigated to directly
      dispatch(setUrlData(pathData));
    };

    getUrls();
  }, [dispatch]);
  return <>{children}</>;
};
