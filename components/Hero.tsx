import React from 'react';
import Image, { StaticImageData } from 'next/image';
import BookTasterForm from './BookTasterForm/BookTasterForm';
type Props = {
  bgImage: StaticImageData;
  logo: StaticImageData;
  heroText: any;
};

export function Hero({ bgImage, logo, heroText }: Props) {
  return (
    <section className="top-0 left-0 flex flex-row relative ">
      {/* hero text block */}
      <div className="absolute z-10 md:bottom-6  md:left-16 p-2 pl-5 w-5/12 h-72">{heroText}</div>
      {/* hero image  */}
      <div className="w-full md:w-3/4">
        <Image src={bgImage} />
      </div>
      {/*  Logo  */}
      <div className="hidden absolute md:block  md:right-20 md:top-20 md:w-96">
        <Image src={logo} />;
      </div>

        <BookTasterForm />
    </section>
  );
}
