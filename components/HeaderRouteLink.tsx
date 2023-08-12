'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  children: ReactNode, 
  route: string
};

const HeaderRouteLink = ({ children, route }: Props) => {

  const pathname = usePathname();

  const isCurrentPage = (pathname === route);

  return (
    <div className='min-w-[2.25rem] mt-6 sm:mt-0 mx-0 sm:mx-4 flex flex-col justify-center items-center hover:scale-110 transition-transform duration-100'>
      <Link 
        href={route} 
        className='font-medium'
      >
        {children}
      </Link>
      <div className={`${isCurrentPage ? 'w-[2.25rem]' : 'w-0'} h-0.5 bg-amber-600 rounded transition-all duration-75`}></div>
    </div>
  );
};

export default HeaderRouteLink;