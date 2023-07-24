import Image from 'next/image';
import Slideshow from '@/components/Slideshow';
import bgOne from '@/public/bg--home-1.png';
import wheelbarrow from '@/public/graphic--wheelbarrow-2.png';
import { getAllNewsPosts } from '@/lib/database';

export const revalidate = 60;

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
        <div className='w-[45%] px-12 py-5 bg-blue-100 bg-opacity-80 rounded-2xl shadow-md flex flex-row justify-center items-center'>
          <p className='text-lg mx-4 leading-5'>
            At Coyote Song Farm & Forest we grow produce & flowers with focused attention to building living soil.
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