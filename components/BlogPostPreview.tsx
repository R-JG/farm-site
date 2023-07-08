import Link from 'next/link';
import { BlogPost } from '@/utils/types';

type Props = {
  postData: BlogPost
};

const BlogPostPreview = ({ postData }: Props) => {
  return (
    <div className='w-[24rem] p-8 m-6 border-2 rounded-xl border-black flex flex-col justify-start items-start overflow-hidden hover:scale-105 transition-all cursor-pointer'>
      <h1 className='text-xl font-medium'>{postData.title}</h1>
      <h4>{postData.date}</h4>
      <p className='my-4 line-clamp-3'>
        {postData.content}
      </p>
      <Link 
        href={''}
        className='p-1 my-2 rounded bg-blue-50'
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogPostPreview;