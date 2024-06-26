import Image from 'next/image';
import ThumbnailGallery from '@/components/ThumbnailGallery';
import hipcamp from '@/public/icon--hipcamp.png';
import airbnb from '@/public/icon--airbnb-color.svg';
import glampingOne from '@/public/glamping--1.webp';
import glampingTwo from '@/public/glamping--2.webp';
import glampingThree from '@/public/glamping--3.webp';
import glampingFour from '@/public/glamping--4.webp';
import glampingFive from '@/public/glamping--5.webp';

const GlampingPage = () => {
  return (
    <main className='p-9 flex flex-col sm:flex-row justify-center items-center'>
      <ThumbnailGallery 
        imageType='static-import'
        images={[glampingOne, glampingTwo, glampingThree, glampingFour, glampingFive]}
      />
      <div className='sm:w-[35vw] sm:mx-10 mb-10 sm:mb-20 mt-5 sm:mt-0'>
        <h1 className='text-2xl font-medium mb-4 '>
          Camp in comfort on the farm!
        </h1>
        <p>
          Our farm stay “glamping” site is nestled away in a secluded field set back on the property. With beautifully crafted kitchen, dining and outhouse structures and a fantastic fire pit complete with cooking grill and small stone oven as well as a propane bbq and burners it has everything you need for a relaxing and comfortable camping experience. Our 5 m diameter bell tent has a comfy queen sized bed and a cozy duvet and pillows. We supply linens, water and firewood, just bring food, drink and clothes and enjoy a peaceful escape just a little over an hour from Toronto!
        </p>
        <div className='flex flex-row items-center'>
          <a
            href='https://www.hipcamp.com/en-CA/land/ontario-coyote-song-farm-forest-v1qh1l2o?utm_source=host_outreach&utm_medium=embed_badge&utm_campaign=reviews_badge'
            target='_blank'
          >
            <div className='text-lg font-medium h-fit w-fit p-2 my-8 rounded-lg bg-blue-50 flex flex-row justify-center items-center hover:scale-105 transition-all'>
              <span className='m-2'>
                Book on Hipcamp
              </span>
              <Image 
                src={hipcamp}
                alt='Hipcamp'
                className='w-8 aspect-square'
              />
            </div>
          </a>
          <a
            href='https://www.airbnb.ca/rooms/52457042'
            target='_blank'
          >
            <div className='text-lg font-medium h-fit w-fit p-2 mx-4 my-8 rounded-lg bg-blue-50 flex flex-row justify-center items-center hover:scale-105 transition-all'>
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
      </div>
    </main>
  );
};

export default GlampingPage;