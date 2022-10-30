import React from 'react';
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
  const sortedItems = pathData.sort((a: PageItem, b: PageItem) =>
    a.order < b.order ? -1 : 1,
  );
  return (
    <nav>
      {/*desktop nav container*/}
      <div className="hidden h-28 from-lightGold flex-row w-full justify-center items-center bg-gradient-to-b to-gold md:flex">
        <Link href="/">
          <a className="text-lightBlack font-heading px-3 hover:underline hover:text-gray-600 text-2xl">
            Home
          </a>
        </Link>

        {sortedItems.map((item: { slug: string; displayText: string }) => (
          <Link key={item.slug} href={item.slug}>
            <a className="text-lightBlack font-heading px-3 hover:underline hover:text-gray-600 text-2xl">
              {item.displayText}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
