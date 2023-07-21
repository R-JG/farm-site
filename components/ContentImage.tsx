'use client';

import { ImageLoaderProps } from 'next/image';
import Image from 'next/image';

const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  return `https://res.cloudinary.com/dsvixs5p2/image/upload/${params.join(',')}/${src}`;
};

type Props = {
  src: string,
  alt: string,
  sizes: string,
  fill: boolean,
  className: string
};

const ContentImage = ({ src, alt, sizes, fill, className }: Props) => {
  return (
    <Image 
      loader={cloudinaryLoader}
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
    />
  );
};

export default ContentImage;