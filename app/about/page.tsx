import Image from 'next/image';
import lizAndJohn from '@/public/liz-and-john.webp';

const About = () => {
  return (
    <main>
      <div className='m-4 flex flex-row justify-center items-center'>
        <Image 
          src={lizAndJohn} 
          alt='Liz and John'
          className='max-w-[34.5rem] m-9 rounded-2xl' 
        />
        <div className='max-w-lg m-8'>
          <h1 className='text-2xl font-medium mb-3'>
            Meet Liz & John
          </h1>
          <p className=' '>
            Begun in 2020 as a result of a “Covid career change” the farm is an evolving project in which Liz and John are constantly learning about growing food and flowers according to organic and regenerative farming principles. We do not use conventional chemical inputs and are learning techniques to encourage healthy, living soil such as cover cropping, incorporating organic materials regularly and maintaining living pathways. Our goal is to scale the farm so that we can support ourselves growing healthy, fresh and beautiful food and flowers on a small scale, using as little fossil fuel as possible. It takes a lot of hard work and there is much to learn. We get tremendous satisfaction from feeding ourselves, our families and community with healthy fresh produce and from producing beautiful blooms to brighten peoples days.
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