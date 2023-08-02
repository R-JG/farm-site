import Link from 'next/link';
import { BlogPost } from '@/utils/types';

type Props = {
  postData: BlogPost
};

const BlogPostPreview = ({ postData }: Props) => {
  return (
    <div className='w-[24rem] m-6 border-2 rounded-xl border-black hover:scale-105 transition-all cursor-pointer'>
      <Link 
        href={`/blog/${postData.id}`}
        className='w-full h-full p-8 flex flex-col justify-start items-start overflow-hidden '
      >
        <h1 className='text-xl font-medium line-clamp-1'>
          {postData.title}
        </h1>
        <h2>
          {postData.date}
        </h2>
        <p className='my-4 line-clamp-3'>
          {postData.content}
        </p>
        <h3 className='p-2 my-2 rounded bg-blue-200'>
          Read More
        </h3>
      </Link>
    </div>
  );
};

export default BlogPostPreview;