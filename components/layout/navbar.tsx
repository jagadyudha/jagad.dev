import React from 'react';
import Link from 'next/link';
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
      <div className='flex justify-center md:my-0'>
        <div className=' absolute -top-20 z-[-2] h-10 w-full max-w-6xl bg-gradient-to-r from-primary  to-purple-800 blur-3xl xl:-top-10'></div>
      </div>
      {/* Desktop View */}
      <nav className='relative z-10 hidden justify-center py-6 pt-10 sm:flex'>
        <div className='text-lg sm:space-x-10 sm:pr-2 md:ml-10 md:space-x-12 md:pr-4'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <a className='border-b-2 border-primary pb-1 text-white'>
                  {item.name}
                </a>
              ) : (
                <a className='text-gray-300 hover:text-primary'>{item.name}</a>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile View */}
      <nav className='relative z-20 mt-3 w-full bg-opacity-90 px-0 xs:px-4 sm:hidden'>
        <div className='flex justify-center space-x-6'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <a className=' my-4 text-gray-300'>
                  <p className='flex justify-center border-b-2 border-primary pb-1 text-sm '>
                    {item.name}
                  </p>
                </a>
              ) : (
                <a className='my-4 text-gray-300'>
                  <p className='flex justify-center text-sm'>{item.name}</p>
                </a>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
