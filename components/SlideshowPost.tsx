import Image from 'next/image';
import Link from 'next/link';
import { HomePost } from '@/utils/types';

type Props = {
  postData: HomePost
};

const SlideshowPost = ({ postData }: Props) => {

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <div className='w-5/12 ml-16 flex flex-col justify-center items-start'>
        <h1 className='text-2xl font-medium mb-3 border-b-2 border-black'>{postData.title}</h1>
        <p className=''>{postData.content}</p>
        {postData.link && 
        <Link 
          href={postData.link}
          className=' p-2 my-4 text-blue-50 bg-blue-900 bg-opacity-70 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Test Link
        </Link>}
      </div>
      <div className='relative w-5/12 ml-6 mb-9 mt-3 aspect-square rounded grid place-content-center overflow-hidden'>
        <Image 
          key={postData.images[0]}
          src={postData.images[0]} 
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