import Image from 'next/image';
import lizAndJohn from '@/public/liz-and-john.webp';

const About = () => {
  return (
    <main>
      <div className='m-4 flex flex-row justify-center items-start'>
        <Image 
          src={lizAndJohn} 
          alt='Liz and John'
          className='max-w-[36rem] m-9 rounded-2xl' 
        />
        <div className='mt-12 ml-8 flex flex-col'>
          <div className='max-w-lg'>
            <h1 className='text-2xl font-medium mb-3'>
              Meet Liz & John
            </h1>
            <p className=' '>
              Begun in 2020 as a result of a “Covid career change” the farm is an evolving project in which Liz and John are constantly learning about growing food and flowers according to organic and regenerative farming principles. We do not use conventional chemical inputs and are learning techniques to encourage healthy, living soil such as cover cropping, incorporating organic materials regularly and maintaining living pathways. Our goal is to scale the farm so that we can support ourselves growing healthy, fresh and beautiful food and flowers on a small scale, using as little fossil fuel as possible. It takes a lot of hard work and there is much to learn. We get tremendous satisfaction from feeding ourselves, our families and community with healthy fresh produce and from producing beautiful blooms to brighten peoples days.
            </p>
          </div>
          <span className=' text-lg font-medium mt-9'>
            Check out our appearances in:
          </span>
          <div className='flex flex-row'>
            <a 
              href='https://torontolife.com/life/i-was-a-pub-owner-now-im-a-farmer-when-covid-killed-her-business-she-reinvented-her-life'
              target='_blank'
              className='text-lg py-1 px-3 my-2 mr-2 bg-blue-200 rounded-2xl hover:scale-105 transition-transform'
            >
              Toronto Life
            </a>
            <a 
              href='https://www.blogto.com/eat_drink/2023/03/pub-close-starts-farm-just-outside-toronto'
              target='_blank'
              className='text-lg py-1 px-3 m-2 bg-blue-200 rounded-2xl hover:scale-105 transition-transform'
            >
              blogTO
            </a>
          </div>
        </div>
      </div>
      <div className='w-[100vw] py-4 mt-6 bg-blue-200 flex flex-row justify-center items-center'>
        <iframe 
          width='560' 
          height='315' 
          src='https://www.youtube.com/embed/Zqm1Hja2s70' 
          title='YouTube video player' 
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' 
          className='my-8 ml-8 mr-4 rounded-lg'
        >
        </iframe>
        <iframe 
          width='560' 
          height='315' 
          src='https://www.youtube.com/embed/OQkVViOf42E' 
          title='YouTube video player' 
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' 
          className='my-8 mr-8 ml-4 rounded-lg'
        >
        </iframe>
      </div>
    </main>
  );
};

export default About;