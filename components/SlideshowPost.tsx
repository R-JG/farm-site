import Link from 'next/link';
import { NewsPost } from '@/utils/types';
import ContentImage from './ContentImage';

type Props = {
  postData: NewsPost & { images: { id: string, newsPostId: number }[] }
};

const SlideshowPost = ({ postData }: Props) => {
  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <div className='w-5/12 ml-16 mr-3 flex flex-col justify-center items-start'>
        <h1 className='text-2xl font-medium mb-3 border-b-2 border-black'>{postData.title}</h1>
        <p className='text-lg leading-6 my-1'>{postData.content}</p>
        {postData.link && 
        <Link 
          href={postData.link}
          target={(postData.link[0] === '/') ? '_self' : '_blank'}
          className='px-4 py-2 my-4 text-blue-50 bg-blue-900 bg-opacity-70 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          {postData.linkText}
        </Link>}
      </div>
      <div className='relative w-5/12 ml-6 mb-9 mt-3 aspect-square rounded grid place-content-center overflow-hidden'>
        <ContentImage 
          src={postData.images[0].id} 
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover rounded'
        />
      </div>
    </div>
  );
};

export default SlideshowPost;