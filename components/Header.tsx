import Image from 'next/image';
import logo from '@/public/logo--text-only.png';
import cart from '@/public/cart--wheelbarrow.svg';

const Header = () => {
  return (
    <header className='w-full p-4 flex flex-row justify-between items-center shadow bg-gradient-to-r from-blue-100 from-5% to-85%'>
      <Image 
        src={logo} 
        alt='Coyote Song Farm & Forest'
        priority
        className='max-w-sm mx-3 pointer-events-none select-none'
      />
      <div className='flex flex-row'>
        <h2 className='mx-4 font-semibold'>Home</h2>
        <h2 className='mx-4 font-semibold'>Shop</h2>
        <h2 className='mx-4 font-semibold'>Glamping</h2>
        <h2 className='mx-4 font-semibold'>Blog</h2>
        <h2 className='mx-4 font-semibold'>About</h2>
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