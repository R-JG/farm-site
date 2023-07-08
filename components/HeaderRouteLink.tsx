'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  linkText: string, 
  route: string
};

const HeaderRouteLink = ({ linkText, route }: Props) => {

  const pathname = usePathname();

  const isCurrentPage = (pathname === route);

  return (
    <div className='flex flex-col justify-center items-center hover:scale-110 transition-transform duration-100'>
      <Link 
        href={route} 
        className='mx-4 font-medium'
      >
        {linkText}
      </Link>
      <div className={`${isCurrentPage ? 'w-9' : 'w-0'} h-0.5 bg-amber-600 rounded transition-all duration-75`}></div>
    </div>
  );
};

export default HeaderRouteLink;