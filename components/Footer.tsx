import NewsletterForm from './NewsletterForm';
import IconLink from './IconLink';
import facebookIcon from '@/public/icon--facebook.svg';
import instagramIcon from '@/public/icon--instagram.svg';

const Footer = () => {
  return (
    <footer className='w-full pt-10 pb-7 bg-blue-50 flex flex-row justify-evenly items-start'>
      <NewsletterForm />
      <div className='ml-10 flex flex-row justify-center items-start'>
        <div className='mr-12 flex flex-col'>
          <span className=' text-lg mb-1'>
            Contact us:
          </span>
          <span className='italic'>
            coyotesongfarmforest@gmail.com
          </span>
          <span className='italic'>
            (416) 817-2132
          </span>
          <span className='mt-5'>
            5122 4th Line  Erin, Ontario  L7J 2L8
          </span>
        </div>
        <div className='ml-8 flex flex-col justify-center items-start'>
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