'use client';

import { useState } from 'react';
import Image from 'next/image';
import ContentImage from './ContentImage';

type Props = {
  imageType: 'static-import' | 'admin-content',
  images: any[],
};

const ThumbnailGallery = ({ imageType, images }: Props) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  return (
    <div className='w-[90vw] sm:w-[30vw] flex flex-col justify-start items-center'>
      <div className='w-full aspect-square m-1 relative shadow'>
        {(imageType === 'static-import') 
        ? <Image 
          key={images[selectedImageIndex]}
          src={images[selectedImageIndex]}
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover rounded-md'
        />
        : <ContentImage 
          key={images[selectedImageIndex]}
          src={images[selectedImageIndex]}
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover rounded-md'
        />}
      </div>
      <div className='w-full flex flex-row justify-start items-start flex-wrap'>
        {images.map((image, index) => 
        <div 
          key={index}
          onClick={() => setSelectedImageIndex(index)}
          className='w-[20%] aspect-square m-1 relative opacity-90 shadow cursor-pointer hover:scale-105 transition-all'
        >
          {(imageType === 'static-import') 
          ? <Image 
            src={image}
            alt=''
            fill={true}
            sizes='(max-width: 640px) 20vw, 10vw'
            className='object-cover rounded-md'
          />
          : <ContentImage 
            src={image}
            alt=''
            fill={true}
            sizes='(max-width: 640px) 20vw, 10vw'
            className='object-cover rounded-md'
          />}
        </div>)}
      </div>
    </div>
  );
};

export default ThumbnailGallery;