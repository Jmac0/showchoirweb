import React from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {
  bgImage: StaticImageData;
  logo: StaticImageData;
};

export function Hero({ bgImage, logo }: Props) {
  return (
    <section className="absolute flex flex-row -z-10">
      <div className="w-full md:w-3/4">
        <Image src={bgImage} />
      </div>
      <div className="hidden md:block md:pt-32 md:pr-16 md:w-96">
        <Image src={logo} />;
      </div>
    </section>
  );
}

export default Hero;
