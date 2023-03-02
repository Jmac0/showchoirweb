import React from 'react';
import { useRouter } from 'next/router';
type Props = {
  text: string;
  navigateTo: string;
};
// button for internal nav learn more etc
export function NavigateButton({ text, navigateTo }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(navigateTo)}
      className={` disabled:opacity-75 w-1/3 h-10  mt-2 rounded-md border-lightGoldmd bg-transparent border-2 border-lightGold 
		enabled:hover:bg-lightGold enabled:hover:text-black enabled:transition-colors enabled:duration-500  `}
      type="button"
    >
      {' '}
      {text}
    </button>
  );
}
