import Image from 'next/image';
import lizAndJohn from '@/public/static/liz-and-john.webp';

const About = () => {
  return (
    <main>
      <div className='m-4 flex flex-row justify-center items-center'>
        <Image 
          src={lizAndJohn} 
          alt='Liz and John'
          className='max-w-lg m-9 rounded-2xl' 
        />
        <div className='max-w-lg m-8'>
          <h1 className='text-2xl font-medium mb-3'>
            Meet Liz & John
          </h1>
          <p>
            When the pandemic struck and Liz&apos;s pub was forced to close we decided to take a giant leap into a new life together. John has had a lifelong love of plants and a 35 year career as a landscape gardener. Liz has grown vegetables in her backyard garden for many years, and has always been impassioned by movements to support local food systems that shorten the supply chain and respect the delicate balance of nature. At Coyote Song Farm & Forest we combine our complementary skill sets growing vegetables, herbs, fruit and flowers using organic principles, building healthy soil and protecting our environment.
          </p>
        </div>
      </div>
      <div className='w-[100vw] py-8 mt-6 flex flex-row justify-center items-start bg-blue-200'>
        <iframe 
          width='560' 
          height='315' 
          src='https://www.youtube.com/embed/Zqm1Hja2s70' 
          title='YouTube video player' 
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' 
          className='m-4 rounded-lg'
        >
        </iframe>
        <iframe 
          width='560' 
          height='315' 
          src='https://www.youtube.com/embed/OQkVViOf42E' 
          title='YouTube video player' 
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' 
          className='m-4 rounded-lg'
        >
        </iframe>
      </div>
    </main>
  );
};

export default About;