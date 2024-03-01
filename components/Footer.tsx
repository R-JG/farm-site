import Image from 'next/image';
import NewsletterForm from './NewsletterForm';
import IconLink from './IconLink';
import efaoMemberLogo from '@/public/efao-member-logo.png';
import facebookIcon from '@/public/icon--facebook.svg';
import instagramIcon from '@/public/icon--instagram.svg';
import { MAILERLITE_API_KEY } from '@/utils/config';

const Footer = () => {

  const addNewsletterSubscriber = async (email: string): Promise<void> => {
    'use server';
    try {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}` 
        },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('A new newsletter subscriber was added:', data);
      };
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <footer className='w-full h-fit pt-10 pb-7 bg-blue-50 flex flex-col sm:flex-row justify-evenly items-center sm:items-start'>
      <div className='hidden sm:inline'>
        <Image 
          src={efaoMemberLogo}
          alt='EFAO member'
          className=' w-28 aspect-square'
        />
      </div>
      <NewsletterForm 
        addNewsletterSubscriber={addNewsletterSubscriber} 
      />
      <div className='w-full sm:w-fit mt-7 sm:mt-0 sm:ml-10 flex flex-col sm:flex-row justify-center items-center sm:items-start'>
        <div className='sm:mr-12 flex flex-col'>
          <span className='text-lg mb-1'>
            Contact us:
          </span>
          <span className='italic'>
            coyotesongfarmforest@gmail.com
          </span>
          <span className='italic'>
            (416) 817-2132
          </span>
          <span className='mt-2 sm:mt-5'>
            5122 4th Line  Erin, Ontario  L7J 2L8
          </span>
        </div>
        <div className='mt-8 sm:mt-0 sm:ml-8 flex flex-col justify-center items-start'>
          <span className='text-lg ml-2 '>
            Follow us:
          </span>
          <div className='flex flex-row justify-center items-start'>
            <IconLink 
              importedImage={facebookIcon}
              alt='Facebook'
              href='https://www.facebook.com/CoyoteSongFarmForest'
            />
            <IconLink
              importedImage={instagramIcon}
              alt='Instagram' 
              href='https://www.instagram.com/coyotechorus/'
            />
          </div>
          <span className='text-sm mt-7'>
            © 2023, Coyote Song Farm & Forest
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;