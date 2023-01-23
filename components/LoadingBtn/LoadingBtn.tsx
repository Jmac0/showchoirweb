import React from 'react';

type Props = {
  text: string;
disableBtn: boolean;
  loading: boolean;
};

export function LoadingBtn({ text, loading }: Props) {
  return (
    <button
	  disabled={loading}
      className={` disabled:opacity-75 w-1/3 h-10 ml-32 mt-2 rounded-md border-lightGoldmd bg-transparent border-2 border-lightGold 
		enabled:hover:bg-lightGold enabled:hover:text-black enabled:transition-colors enabled:duration-500 ${loading && "animate-pulse"} `}
      type="submit"
    >
      {loading ? 'Loading' : text}
    </button>
  );
}
