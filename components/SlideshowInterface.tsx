'use client';

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import arrowBack from '@/public/arrow-left.svg';
import arrowForward from '@/public/arrow-right.svg';

type Props = {
  children: ReactNode, 
  postAmount: number, 
  postViewportWidth: number
};

const SlideshowInterface = ({ children, postAmount, postViewportWidth }: Props) => {

  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [userHasNavigated, setUserHasNavigated] = useState<boolean>(false);

  const translateVWAmount = `${-(currentPostIndex * postViewportWidth)}vw`;

  const handleBackButton = (): void => {
    setCurrentPostIndex((currentPostIndex > 0) ? (currentPostIndex - 1) : (postAmount - 1));
    if (!userHasNavigated) setUserHasNavigated(true);
  };

  const handleForwardButton = (): void => {
    setCurrentPostIndex((currentPostIndex < (postAmount - 1)) ? (currentPostIndex + 1) : 0);
    if (!userHasNavigated) setUserHasNavigated(true);
  };
  
  const handleBulletClick = (bulletIndex: number): void => {
    setCurrentPostIndex(bulletIndex);
    if (!userHasNavigated) setUserHasNavigated(true);
  };

  useEffect(() => {
    const postChangeInterval = setInterval(() => 
      setCurrentPostIndex(prevIndex => (prevIndex < (postAmount - 1)) ? (prevIndex + 1) : 0)
    , 7000);
    if (userHasNavigated) clearInterval(postChangeInterval);
    return () => clearInterval(postChangeInterval);
  }, [userHasNavigated, postAmount]);

  return (
    <div className='w-full h-fit flex flex-col justify-start items-start'>
      <button 
        onClick={handleBackButton} 
        className='group absolute left-0 z-10 h-full'
      >
        <div className='h-full bg-blue-900 bg-opacity-5 hover:bg-opacity-10 transition-colors flex flex-row justify-center'>
          <Image 
            src={arrowBack} 
            alt='Back' 
            className='w-9 m-2 group-hover:scale-110 transition-transform' 
          />
        </div>
      </button>
      <div 
        style={{ transform: `translate(${translateVWAmount})` }}
        className='transition-transform duration-500'
      >
        {children}
      </div>
      <button 
        onClick={handleForwardButton} 
        className='group absolute right-0 z-10 h-full'
      >
        <div className='h-full bg-blue-900 bg-opacity-5 hover:bg-opacity-10 transition-colors flex flex-row justify-center'>
          <Image 
            src={arrowForward} 
            alt='Forward' 
            className='w-9 m-2 group-hover:scale-110 transition-transform' 
          />
        </div>
      </button>
      <div className='absolute bottom-0 self-center m-2 flex flex-row justify-center items-center'>
        {Array.from({ length: postAmount }).map((_, index) => 
        <div 
          key={index} 
          onClick={() => handleBulletClick(index)}
          className={`h-3 aspect-square m-2 rounded-2xl bg-blue-950 ${(index === currentPostIndex) ? 'opacity-80' : 'opacity-20'} hover:scale-110 transition-transform cursor-pointer`}
        >
        </div>)}
      </div>
    </div>
  );
};

export default SlideshowInterface;