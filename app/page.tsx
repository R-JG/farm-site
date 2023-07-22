import Image from 'next/image';
import Slideshow from '@/components/Slideshow';
import bgOne from '@/public/bg--home-1.png';
import bgTwo from '@/public/bg--home-2.png';
import wheelbarrow from '@/public/graphic--wheelbarrow-2.png';

const Home = () => {
  
  return (
    <main className='flex flex-col justify-start items-center'>
      <div className='fixed top-0 -z-50'>
        <div className='h-[100vh] w-[100vw]'>
          <Image
            priority={true} 
            src={bgOne}
            alt=''
            fill={true}
            className='object-cover'
          />
        </div>
      </div>
      <div className='h-[75vh] w-full mt-32 flex flex-col justify-start items-center'>
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
      <Slideshow />
      <div className='relative h-[100vh] w-full overflow-hidden'>
        <div className=' sticky top-0 -z-40 h-[100vh] w-[100vw]'>
          <Image 
            src={bgTwo}
            alt=''
            fill={true}
            className='object-cover'
          />
        </div>
      </div>
    </main>
  );
};

export default Home;