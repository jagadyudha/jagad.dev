import React from 'react';
import Link from '@/components/customLink';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Posts', href: '/posts' },
  { name: 'Projects', href: '/projects' },
  { name: 'Activites', href: '/activities' },
  { name: 'About', href: '/about' },
];

const Navbar = () => {
  const router = useRouter();

  const checkSlug = router.pathname.endsWith('/[slug]')
    ? router.pathname.replace('/[slug]', '')
    : router.pathname;

  return (
    <>
      <div className='relative flex justify-center'>
        <div className='background-animate absolute -top-10 z-[-2] mx-auto hidden h-10 w-full max-w-6xl bg-gradient-to-r  from-primary via-blue-500 to-pink-500 blur-3xl lg:block'></div>
      </div>
      {/* Desktop View */}
      <nav className='relative z-10 hidden justify-center py-6 pt-10 sm:flex'>
        <div className='sm:space-x-10 sm:pr-2 md:ml-10 md:space-x-8 md:pr-4'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <span className='border-b-2 border-primary pb-1 text-white'>
                  {item.name}
                </span>
              ) : (
                <span className='text-gray-300 hover:text-primary'>
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
                <p className='my-4 flex justify-center border-b-2 border-primary  pb-1 text-gray-300'>
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
