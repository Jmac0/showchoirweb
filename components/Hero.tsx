import React from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {
  bgImage: StaticImageData;
};

export function Hero({ bgImage }: Props) {
  return (
      <Image src={bgImage} />
  );
}

export default Hero;
