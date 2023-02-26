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
    <section className="relative flex flex-col lg:flex-row lg:h-screen  bg-black">
      {/* hero image  */}
      <div className="w-full  lg:w-3/4">
        <Image alt="image of choir signing" src={bgImage} />
      </div>
      {/*  Logo  */}
      <div className="absolute right-3 md:hidden ">
        <Image alt="logo" width={100} height={100} src={logo} />;
      </div>
      <div className="absolute right-3 hidden  lg:hidden md:block ">
        <Image alt="logo" width={200} height={200} src={logo} />;
      </div>
      <div className="absolute hidden md:right-20  md:top-20 lg:block ">
        <Image alt="logo" width={270} height={270} src={logo} />;
      </div>

      {/* hero text block */}
      <div className="z-10 p-2 pl-5 -mt-24 md:bottom-0  lg:absolute lg:bottom-6 lg:left-16 lg:h-72 ">
        {heroText}
      </div>
      <BookTasterForm />
    </section>
  );
}
