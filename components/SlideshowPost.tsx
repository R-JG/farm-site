import Link from 'next/link';
import { NewsPost } from '@/utils/types';
import ContentImage from './ContentImage';

type Props = {
  postData: NewsPost & { images: { id: string, newsPostId: number }[] }
};

const SlideshowPost = ({ postData }: Props) => {
  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <div className='w-1/2 py-8 pl-12 flex flex-row justify-end items-center'>
        <div className=' min-w-[20rem] w-fit ml-16 mr-3 flex flex-col justify-center items-start'>
          <h1 className='text-2xl font-medium mb-6 border-b-2 border-black'>{postData.title}</h1>
          <p className='text-lg leading-6 my-1'>{postData.content}</p>
          {postData.link && 
          <Link 
            href={postData.link}
            target={(postData.link[0] === '/') ? '_self' : '_blank'}
            className='px-4 py-2 mt-9 text-blue-50 bg-blue-900 bg-opacity-70 rounded active:bg-blue-300 hover:scale-105 transition-all'
          >
            {postData.linkText}
          </Link>}
        </div>
      </div>
      <div className='w-1/2 flex flex-row justify-end items-center'>
        <div className='relative w-[80%] ml-6 aspect-square grid place-content-center overflow-hidden'>
          <ContentImage 
            src={postData.images[0].id} 
            alt=''
            fill={true}
            sizes='(max-width: 640px) 90vw, 40vw'
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default SlideshowPost;