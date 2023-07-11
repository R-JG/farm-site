'use client';

import { useState } from 'react';
import { HomePost } from '@/utils/types';
import Image from 'next/image';
import HomePageSlideshowPost from './HomePageSlideshowPost';
import arrowBack from '@/public/static/arrow-left.svg';
import arrowForward from '@/public/static/arrow-right.svg';

type Props = {
  posts: HomePost[]
};

const HomePageSlideshow = ({ posts }: Props) => {

  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);

  const postViewportWidth = 90;
  const translateVWAmount = `${-(currentPostIndex * postViewportWidth)}vw`;

  const postWidthClass = `w-[${postViewportWidth}vw]`;
  const postTranslateClass = `translate-x-[${translateVWAmount}]`;

  const handleBackButton = (): void => {
    setCurrentPostIndex((currentPostIndex > 0) ? (currentPostIndex - 1) : (posts.length - 1));
  };

  const handleForwardButton = (): void => {
    setCurrentPostIndex((currentPostIndex < (posts.length - 1)) ? (currentPostIndex + 1) : 0);
  };

  return (
    <div className='w-fit bg-blue-200 flex flex-row justify-center items-center relative rounded-2xl overflow-hidden'>
      <button 
        onClick={handleBackButton} 
        className='group absolute left-0 z-10 h-full'
      >
        <div className='h-full bg-blue-900 bg-opacity-5 hover:bg-opacity-10 transition-colors flex flex-row justify-center'>
          <Image 
            src={arrowBack} 
            alt='Back' 
            className='w-9 m-1 group-hover:scale-110 transition-transform' 
          />
        </div>
      </button>
      <div className={`${postWidthClass} h-fit overflow-hidden`}>
        <div className={`w-max flex flex-row justify-start items-start ${postTranslateClass} transition-transform duration-500`}>
        {posts.map(post =>
        <HomePageSlideshowPost 
          key={post.id}
          widthClass={postWidthClass}
          postData={post}
        />)}
        </div>
      </div>
      <button 
        onClick={handleForwardButton} 
        className='group absolute right-0 z-10 h-full'
      >
        <div className='h-full bg-blue-900 bg-opacity-5 hover:bg-opacity-10 transition-colors flex flex-row justify-center'>
          <Image 
            src={arrowForward} 
            alt='Forward' 
            className='w-9 m-1 group-hover:scale-110 transition-transform' 
          />
        </div>
      </button>
      <div className='absolute bottom-0 m-2 flex flex-row justify-center items-center'>
        {posts.map((post, index) => 
        <div 
          key={post.id} 
          className={`h-3 aspect-square m-2 rounded-2xl bg-blue-950 ${(index === currentPostIndex) ? 'opacity-80' : 'opacity-20'}`}
        >
        </div>)}
      </div>
    </div>
  );
};

export default HomePageSlideshow;