import Image from 'next/image';
import Link from 'next/link';
import { HomePost } from '@/utils/types';

interface Props {
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
      <div className='relative w-[32rem] aspect-square grid place-content-center overflow-hidden rounded-2xl'>
        <Image 
          key={postData.images[0]}
          src={postData.images[0]} 
          alt=''
          fill={true}
          sizes=''
          className=''
        />
      </div>
    </div>
  );
};

export default HomePageColumnPost;