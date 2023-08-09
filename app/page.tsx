import Image from 'next/image';
import NewsColumnPost from '@/components/NewsColumnPost';
import bgOne from '@/public/bg--home-1.png';
import wheelbarrow from '@/public/graphic--wheelbarrow-2.png';
import { getAllNewsPosts } from '@/lib/database';

export const revalidate = 0;

const Home = async () => {

  const allNewsPosts = await getAllNewsPosts();

  return (
    <main className='w-[100vw] flex flex-col justify-start items-center'>
      <div className='fixed top-0 -z-50'>
        <div className='relative h-[100vh] w-[100vw]'>
          <Image
            priority={true} 
            src={bgOne}
            alt=''
            fill={true}
            className='object-cover'
          />
        </div>
      </div>
      <div className='h-[90vh] w-full  flex flex-col justify-start items-center'>
        <div className='w-[67%] px-11 py-4 mt-[8rem] bg-blue-50 bg-opacity-90 rounded-2xl shadow-md flex flex-row justify-evenly items-center'>
          <p className='w-[68%]'>
            <span className='block text-2xl italic text-emerald-700'>
              Coyote Song Farm & Forest
            </span>
            <span className='block text-2xl  pb-2'>
              {'  is a small scale '}
              <span className='italic text-emerald-700'>market garden farm</span>
              {' in Erin, Ontario...'}
            </span>
            <span className='block text-sm'>
              growing fresh produce and flowers according to organic principles with a focus on the development of healthy living soil. We offer a small CSA, flower subscriptions and farm stay camping experiences.
            </span>
          </p>
          <Image 
            src={wheelbarrow}
            alt=''
            className=' w-[12rem]'
          />
        </div>
      </div>
      <div className='w-[100vw] flex flex-col justify-start items-center'>
        {allNewsPosts.map((post, index) => 
        <NewsColumnPost 
          key={post.id}
          postData={post}
          layoutMode={(index % 2) + 1}
        />)}
      </div>
    </main>
  );
};

export default Home;