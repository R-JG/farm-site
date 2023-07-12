import Image from 'next/image';
import ThumbnailGallery from '@/components/ThumbnailGallery';
import airbnb from '@/public/static/icon--airbnb-color.svg';
import glampingOne from '@/public/static/glamping--1.webp';
import glampingTwo from '@/public/static/glamping--2.webp';
import glampingThree from '@/public/static/glamping--3.webp';
import glampingFour from '@/public/static/glamping--4.webp';
import glampingFive from '@/public/static/glamping--5.webp';

const GlampingPage = () => {
  return (
    <main className='flex flex-row justify-center items-center'>
      <ThumbnailGallery 
        images={[glampingOne, glampingTwo, glampingThree, glampingFour, glampingFive]}
      />
      <div className='w-[35vw] mx-10 mb-20'>
        <h1 className='text-2xl font-medium mb-4 '>
          Camp in comfort on the farm!
        </h1>
        <p>
          Nestled in the back field we have created a cozy spot for a farmstay escape. Our 5 m diameter bell tents have queen sized beds so there is no sleeping on the ground here! We have a camp kitchen equipped with all of the utensils, dishes and pots and pans you need to cook up a feast. The compost toilet is located in the nicest outhouse we could build. Just bring food, drink and clothes and enjoy an escape from the city just a little over an hour from Toronto!
        </p>
        <a 
          href='https://www.airbnb.ca/rooms/52457042'
          target='_blank'
        >
          <div className=' text-lg font-medium h-fit w-fit p-2 my-8 rounded-lg bg-blue-50 flex flex-row justify-center items-center hover:scale-105 transition-all'>
            <span className='m-2'>
              Book on Airbnb
            </span>
            <Image 
              src={airbnb}
              alt='Airbnb'
              className='w-8 aspect-square'
            />
          </div>
        </a>
      </div>
    </main>
  );
};

export default GlampingPage;