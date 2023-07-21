import Image from 'next/image';
import Slideshow from '@/components/Slideshow';
import bgOne from '@/public/bg--home-1.png';

const Home = () => {
  
  return (
    <main className='flex flex-col justify-start items-center'>
      <div className='fixed top-0 -z-10 h-[100vh] w-[100vw]'>
        <Image
          priority={true} 
          src={bgOne}
          alt='background image'
          fill={true}
          className='object-cover'
        />
      </div>
      <div className='h-[30vh] w-full mx-9 flex flex-col justify-center items-start'>
        <p className=' mx-24'>
          At Coyote Song Farm & Forest we grow produce & flowers with focused attention to building living soil
        </p>
      </div>
      <Slideshow />
    </main>
  );
};

export default Home;