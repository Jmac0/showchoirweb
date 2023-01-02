import React from 'react';
import Image, { StaticImageData } from 'next/image';
import BookTasterForm from './BookTasterForm';
type Props = {
  bgImage: StaticImageData;
  logo: StaticImageData;
  heroText: any;
};

export function Hero({ bgImage, logo, heroText }: Props) {
  return (
    <section className="absolute flex flex-row">
      {/* hero text block */}
      <div className="absolute z-10 md:top-2/3 md:left-32">{heroText}</div>
      {/* hero image  */}
      <div className="w-full md:w-3/4">
        <Image src={bgImage} />
      </div>
      {/*  Logo  */}
      <div className="hidden md:block md:pt-32 md:pr-16 md:w-96">
        <Image src={logo} />;
      </div>
      <div className="z-50 absolute">
        <BookTasterForm />
      </div>
    </section>
  );
}

export default Hero;
