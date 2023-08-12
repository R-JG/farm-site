import Link from 'next/link';
import { NewsPost } from '@/utils/types';
import ContentImage from './ContentImage';

type Props = {
  postData: NewsPost,
  layoutMode: number
};

const NewsColumnPost = ({ postData, layoutMode }: Props) => {
  return (
    <div className={`w-full pb-6 sm:pb-0 mb-24 bg-blue-50 opacity-90 flex flex-col ${(layoutMode === 1) ? 'sm:flex-row sm:pl-24' : 'sm:flex-row-reverse sm:pr-24'} justify-between items-center`}>
      <div className='w-3/4 sm:w-1/2 py-8 flex flex-row justify-center items-center'>
        <div className=' sm:min-w-[20rem] flex flex-col justify-center items-center sm:items-start'>
          <h1 className='text-2xl font-medium mb-6 border-b-2 border-black'>
            {postData.title}
          </h1>
          <p className='text-lg leading-6 my-1'>
            {postData.content}
          </p>
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
      <div className='relative w-[90vw] sm:w-[40vw] aspect-square grid place-content-center overflow-hidden'>
        <ContentImage 
          src={postData.images[0].id} 
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default NewsColumnPost;