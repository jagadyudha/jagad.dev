import React from 'react';

import { usePathname } from 'next/navigation';

import Link from '@/components/shared/customLink';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Posts', href: '/posts' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
];

const Navbar = () => {
  const pathname = usePathname();
  const filteredPathName = pathname.split('/').filter((item) => item)
  const checkSlug = '/' + (filteredPathName.length > 0 ? filteredPathName[0] : '')
  const isPostSlug =
    pathname.endsWith('/posts/[slug]') || pathname.endsWith('/projects/[slug]');

  return (
    <>
      <div className='relative flex justify-center'>
        {isPostSlug ? (
          <div className='absolute mx-auto hidden h-10 w-full max-w-6xl bg-black blur-3xl lg:block'></div>
        ) : (
          <div className='background-animate absolute -top-10 z-[-2] mx-auto h-10 w-full max-w-6xl bg-gradient-to-r  from-primary via-blue-500 to-pink-500 blur-3xl'></div>
        )}
      </div>
      {/* Desktop View */}
      <nav className='relative z-10 hidden justify-center py-6 pt-10 sm:flex'>
        <div className='sm:space-x-10 sm:pr-2 md:ml-10 md:space-x-8 md:pr-4'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <span className='border-b-2 border-gray-300 pb-1 text-white'>
                  {item.name}
                </span>
              ) : (
                <span className='text-gray-200 hover:text-gray-300'>
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile View */}
      <nav className='relative z-10 mt-3 w-full bg-opacity-90 px-0 xs:px-4 sm:hidden'>
        <div className='flex justify-center space-x-3 text-xs xs:space-x-6 xs:text-sm'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <p className='my-4 flex justify-center border-b-2 border-gray-300 pb-1 text-gray-300'>
                  {item.name}
                </p>
              ) : (
                <p className='my-4 flex justify-center text-gray-300'>
                  {item.name}
                </p>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
