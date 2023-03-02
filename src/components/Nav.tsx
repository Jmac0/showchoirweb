import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
//
import type { PageItem } from '../../types';

type Props = {
  pathData: PageItem[];
};

export function Nav({ pathData }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // copy p:w
  // props to avoid read only error
  const paths = [...pathData];
  // Sort order of menu items by order property
  const sortedItems = paths.sort((a: PageItem, b: PageItem) =>
    a.order < b.order ? -1 : 1,
  );

  useEffect(() => {
    setOpen(false);
  }, [router]);

  const handleClick = (): void => {
    setOpen(!open);
  };
  const menuItems = sortedItems.map(
    (item: { slug: string; displayText: string }) => (
      <Link key={item.slug} href={item.slug}>
        <a className="text-white mb-10 font-heading px-3 md:mb-0 hover:text-gray-600 text-2xl">
          {item.displayText}
        </a>
      </Link>
    ),
  );
  return (
    <>
      {/*draw*/}
      <nav
        className={`absolute ${
          open ? 'left-0' : '-left-full'
        } transition-all z-10 ease-in-out duration-300 w-3/4 h-full bg-gold bg-gradient-to-b to-gold from-lightGold md:hidden `}
      >
        <div className="flex flex-col pl-16  mt-36">
          <Link href="/">
            <a className="mb-10 text-white font-heading px-3  hover:text-gray-600 text-2xl ">
              Home
            </a>
          </Link>

          {menuItems}
        </div>
      </nav>
      {/*draw open overlay */}
      <div
        onClick={handleClick}
        id="#fade"
        className={`w-screen fixed z-[1] h-screen  bg-gray-700  md:hidden ${
          open ? 'opacity-90' : ' opacity-0  invisible'
        } transition-all duration-500 `}
      ></div>
      <nav>
        {/*desktop nav container*/}
        <div className="absolute flex bg-transparent justify-start pl-16 h-16 flex-row w-full md:justify-start items-center  md:h-28">
          <Link href="/">
            <a className="hidden text-white font-heading px-3  hover:text-gray-600 text-2xl md:inline-block">
              Home
            </a>
          </Link>

          <div className="hidden md:inline-block">{menuItems}</div>
          {/*hamburger*/}
          <div
            className="flex  flex-col z-40 w-6 justify-between items-center h-6  md:hidden"
            onClick={handleClick}
          >
            <div
              className={`w-6 h-1 bg-gray-50 rounded-full mb-1  origin-left ${
                open ? 'rotate-45 w-[22px] mt-1 ml-1' : 'rotate-0'
              } transition-all`}
            />
            <div
              className={`w-6 h-1 bg-gray-50 rounded-full  origin-left ${
                open && 'hidden'
              } transition-all`}
            />
            <div
              className={`w-6 h-1 bg-gray-50 rounded-full mt-1  origin-left ${
                open ? '-rotate-45 w-[22px] ml-1' : 'rotate-0'
              } transition-all`}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
