import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo--text-only.png';
import cart from '@/public/icon--cart.svg';
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
        <Link href='/' className='mx-2'>HOME TEST</Link>
        <Link href='/shop' className='mx-2'>SHOP TEST</Link>
        <Link href='/glamping' className='mx-2'>GLAMPING TEST</Link>
        <Link href='/blog' className='mx-2'>BLOG TEST</Link>
        <Link href='/about' className='mx-2'>ABOUT TEST</Link>
        {/*
        <HeaderRouteLink linkText='News' route='/' />
        <HeaderRouteLink linkText='Shop' route='/shop' />
        <HeaderRouteLink linkText='Glamping' route='/glamping' />
        <HeaderRouteLink linkText='Blog' route='/blog' />
        <HeaderRouteLink linkText='About' route='/about' />*/}
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