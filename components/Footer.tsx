import NewsletterForm from './NewsletterForm';
import IconLink from './IconLink';
import facebookIcon from '@/public/static/icon--facebook.svg';
import instagramIcon from '@/public/static/icon--instagram.svg';

const Footer = () => {
  return (
    <footer className='w-full pt-8 pb-12 bg-blue-50 flex flex-row justify-evenly items-end'>
      <NewsletterForm />
      <div className='mx-4 flex flex-row justify-center items-start'>
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
    </footer>
  );
};

export default Footer;