import Image from 'next/image';
import logo from '@/public/static/logo--text-only.png';
import cart from '@/public/static/icon--cart.svg';
import HeaderRouteLink from './HeaderRouteLink';

const Header = () => {
  return (
    <header className='w-full p-4 flex flex-row justify-between items-center shadow bg-gradient-to-r from-blue-50 from-5% to-85%'>
      <Image 
        src={logo} 
        alt='Coyote Song Farm & Forest'
        priority
        className='max-w-sm mx-3 pointer-events-none select-none'
      />
      <div className='flex flex-row'>
        <HeaderRouteLink linkText='News' route='/' />
        <HeaderRouteLink linkText='Shop' route='/shop' />
        <h2 className='mx-4 font-medium'>Glamping</h2>
        <HeaderRouteLink linkText='Blog' route='/blog' />
        <HeaderRouteLink linkText='About' route='/about' />
      </div>
      <Image 
        src={cart}
        alt='Cart'
        className='w-9 mx-4 opacity-80 pointer-events-none select-none'
      />
    </header>
  );
};

export default Header;