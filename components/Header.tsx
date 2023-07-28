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
        <HeaderRouteLink route='/' >News</HeaderRouteLink>
        <HeaderRouteLink route='/shop' >Shop</HeaderRouteLink>
        <HeaderRouteLink route='/glamping' >Glamping</HeaderRouteLink>
        <HeaderRouteLink route='/blog' >Blog</HeaderRouteLink>
        <HeaderRouteLink route='/about' >About</HeaderRouteLink>
      </div>
      <HeaderRouteLink
        route='/cart'
      >
        <Image 
          src={cart}
          alt='Cart'
          className='w-9 opacity-80 pointer-events-none select-none'
        />
      </HeaderRouteLink>
    </header>
  );
};

export default Header;