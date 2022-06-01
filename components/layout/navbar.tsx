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
      {/* Desktop View */}
      <nav className='hidden justify-center bg-background py-6 pt-10 sm:flex'>
        <div className='text-lg sm:space-x-14 sm:pr-2 md:ml-10 md:space-x-16 md:pr-4'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <a className='border-b-2 border-primary pb-1 text-white'>
                  {item.name}
                </a>
              ) : (
                <a className='text-gray-400 hover:text-primary'>{item.name}</a>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile View */}
      <nav className='container fixed bottom-3 z-20 flex justify-center sm:hidden'>
        <div className='justify-center space-x-5 overflow-x-auto overflow-y-hidden rounded-md border border-white border-opacity-10 bg-[#1d1d1d] bg-opacity-80 p-3 text-sm shadow-lg backdrop-blur-md backdrop-filter'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <a className='border-b-2 border-primary py-3 pb-[10.5px] text-white'>
                  {item.name}
                </a>
              ) : (
                <a className='py-3 text-white hover:text-primary'>
                  {item.name}
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
