import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  text: string;
  disableBtn: boolean;
  loading: boolean;
};

export const LoadingBtn = ({ text, loading }: Props,) => {
  useEffect(() => {
    if (loading) {
      setTimeout;
    }
  }, [loading]);
  return (
    <button
      disabled={loading}
      className={` mt-2 h-10 min-w-max px-5 rounded-md border-2 border-lightGold bg-transparent  enabled:transition-colors 
		enabled:duration-500 enabled:hover:bg-lightGold enabled:hover:text-black disabled:opacity-75 ${
      loading && 'animate-pulse'
    } `}
      type="submit"
    >
      {loading ? 'Loading' : text}
    </button>
  );
}
