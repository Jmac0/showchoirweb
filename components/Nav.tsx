import React, { useState } from 'react';
import Link from 'next/link';

type PageItem = {
  slug: string;
  displayText: string;
  order: number;
};
type Props = {
  pathData: [PageItem];
};

export function Nav({ pathData }: Props) {
  const [open, setOpen] = useState(false);
  const sortedItems = pathData.sort((a: PageItem, b: PageItem) =>
    a.order < b.order ? -1 : 1,
  );

  const handleClick = (): void => {
    setOpen(!open);
  };
  return (
    <>
      <nav>
        {/*desktop nav container*/}
        <div className=" justify-start flex pl-6 h-16 from-lightGold flex-row w-full md:justify-center items-center bg-gradient-to-b to-gold md:h-28">
          <Link href="/">
            <a className="hidden text-lightBlack font-heading px-3 hover:underline hover:text-gray-600 text-2xl md:inline-block">
              Home
            </a>
          </Link>

          <div className="hidden md:inline-block">
            {sortedItems.map((item: { slug: string; displayText: string }) => (
              <Link key={item.slug} href={item.slug}>
                <a className="text-lightBlack font-heading px-3 hover:underline hover:text-gray-600 text-2xl">
                  {item.displayText}
                </a>
              </Link>
            ))}
          </div>
          {/*hamburger*/}
          <div
            className="flex flex-col w-7 h-6 justify-between items-center md:hidden"
            onClick={handleClick}
          >
            <div
              className={`w-6 h-1 bg-blue-500 rounded-full bg-lightBlack origin-left ${
                open ? 'rotate-45 w-7' : 'rotate-0'
              } transition-all`}
            />
            <div
              className={`w-6 h-1 bg-blue-500 rounded-full bg-lightBlack origin-left ${
                open && 'bg-transparent'
              } transition-all`}
            />
            <div
              className={`w-6 h-1 bg-blue-500 rounded-full bg-lightBlack origin-left ${
                open ? '-rotate-45 w-7' : 'rotate-0'
              } transition-all`}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
