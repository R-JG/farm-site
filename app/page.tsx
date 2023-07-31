import Image from 'next/image';
import Slideshow from '@/components/Slideshow';
import bgOne from '@/public/bg--home-1.png';
import wheelbarrow from '@/public/graphic--wheelbarrow-2.png';
import { getAllNewsPosts } from '@/lib/database';

export const revalidate = 0;

const Home = async () => {

  const allNewsPosts = await getAllNewsPosts();

  return (
    <main className='flex flex-col justify-start items-center'>
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
      <div className='h-[75vh] w-full mt-[9rem] flex flex-col justify-start items-center'>
        <div className='w-[50%] px-12 py-6 bg-blue-50 rounded-2xl shadow-md flex flex-row justify-center items-center'>
          <p className='mx-4'>
            Coyote Song Farm & Forest is a small scale market garden farm in Erin, Ontario growing fresh produce and flowers according to organic principles with a focus on the development of healthy living soil. We offer a small CSA, flower subscriptions and farm stay camping experiences.
          </p>
          <Image 
            src={wheelbarrow}
            alt=''
            className=' w-[12rem]'
          />
        </div>
      </div>
      <Slideshow allNewsPosts={allNewsPosts} />
      <div className='h-[3vh] w-[100vw] bg-blue-50'>
      </div>
    </main>
  );
};

export default Home;