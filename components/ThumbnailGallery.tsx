'use client';

import { useState, MouseEvent } from 'react';
import Image from 'next/image';

type Props = {
  images: any[],
};

const ThumbnailGallery = ({ images }: Props) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  return (
    <div className='w-[35vw] m-8 flex flex-col justify-start items-center'>
      <div className='w-full aspect-square m-1 relative shadow'>
        <Image 
          key={images[selectedImageIndex]}
          src={images[selectedImageIndex]}
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover rounded-md'
        />
      </div>
      <div className='w-full flex flex-row justify-start items-start flex-wrap'>
        {images.map((image, index) => 
        <div 
          key={index}
          onClick={() => setSelectedImageIndex(index)}
          className='w-[20%] aspect-square m-1 relative opacity-90 shadow cursor-pointer hover:scale-105 transition-all'
        >
          <Image 
            src={image}
            alt=''
            fill={true}
            sizes='(max-width: 640px) 20vw, 10vw'
            className='object-cover rounded-md'
          />
        </div>)}
      </div>
    </div>
  );
};

export default ThumbnailGallery;