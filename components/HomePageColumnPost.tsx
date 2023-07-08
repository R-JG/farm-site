import Image from 'next/image';
import Link from 'next/link';
import { HomePost } from '@/utils/types';

type Props = {
  postData: HomePost,
  position: number
};

const HomePageColumnPost = ({ postData, position }: Props) => {

  const positionStyle = (position === 0) ? 'flex-row' : 'flex-row-reverse';

  return (
    <div className={`py-9 border-b-2 border-blue-50 flex ${positionStyle} justify-center items-center`}>
      <div className='h-full max-w-lg mx-12 flex flex-col justify-center items-start'>
        <h1 className='text-2xl font-medium mb-3 border-b-2 border-black'>{postData.title}</h1>
        <p className=''>{postData.content}</p>
        {postData.link && 
        <Link 
          href={''}
          className='bg-blue-50 p-2 my-4 rounded-md'
        >
          Test Link
        </Link>}
      </div>
      <div className='relative h-[32rem] rounded-2xl aspect-square grid place-content-center overflow-hidden shadow-md'>
        <Image 
          key={postData.images[0]}
          src={postData.images[0]} 
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover rounded-2xl'
        />
      </div>
    </div>
  );
};

export default HomePageColumnPost;