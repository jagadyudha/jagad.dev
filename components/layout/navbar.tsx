import { IoMenu } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useState } from 'react';
import {
  IoAnalyticsOutline,
  IoPersonOutline,
  IoPencilOutline,
  IoCodeSlashOutline,
  IoHomeOutline,
} from 'react-icons/io5';

const navigation = [
  { name: 'Home', href: '/', icon: <IoHomeOutline /> },
  { name: 'Posts', href: '/posts', icon: <IoPencilOutline /> },
  { name: 'Projects', href: '/projects', icon: <IoCodeSlashOutline /> },
  { name: 'Activites', href: '/activities', icon: <IoAnalyticsOutline /> },
  { name: 'About', href: '/about', icon: <IoPersonOutline /> },
];

export default function Navbar() {
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);
  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsMenu(false);
      }
    }

    if (isMenu) {
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    } else {
      document.ontouchmove = function (e) {
        return true;
      };
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenu]);

  return (
    <>
      <div className='flex justify-center md:my-0'>
        <div className=' absolute -top-20 z-[-2] h-10 w-full max-w-6xl bg-gradient-to-r from-primary via-sky-500 to-indigo-600 blur-3xl xl:-top-10'></div>
      </div>
      <nav className='fixed -bottom-6 z-50 mx-auto max-w-3xl flex-none py-10 md:static md:flex md:justify-between md:px-12 xl:px-0'>
        {router.pathname !== '/' ? (
          <Link href={'/'}>
            <a>
              <p className='hidden text-lg font-bold text-white transition-all duration-300 hover:text-primary md:block'>
                Jagad Yudha Awali
              </p>
            </a>
          </Link>
        ) : (
          <div></div>
        )}
        <div className='hidden md:flex md:justify-end md:space-x-6'>
          {navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.href != router.pathname ? (
                <a className='flex items-center font-medium text-white transition-all duration-300 hover:text-primary'>
                  {item.icon}
                  <p className='ml-2'>{item.name}</p>
                </a>
              ) : (
                <a className='flex items-center font-medium text-primary transition-all duration-300 hover:text-primary'>
                  {item.icon}
                  <p className='ml-2'>{item.name}</p>
                </a>
              )}
            </Link>
          ))}
        </div>

        <div
          className={`flex w-screen justify-center transition-all duration-300 md:hidden ${
            isMenu ? ' translate-y-80' : 'translate-y-0'
          }`}
        >
          <button
            onClick={() => setIsMenu(true)}
            className='mx-5 flex items-center rounded-lg border border-white border-opacity-30 bg-background p-2'
          >
            <IoMenu className='mr-2 text-lg text-white' />
            <p className='text-white'>Open Menu</p>
          </button>
        </div>
        {isMenu && (
          <div
            className={`fixed bottom-0 z-10 flex h-screen w-screen items-end justify-center bg-background bg-opacity-80 transition-all duration-75 md:hidden `}
          ></div>
        )}
        <div
          ref={wrapperRef}
          className={`fixed bottom-0 z-10 flex w-screen items-end justify-start rounded-t-xl border-t border-r border-l border-white border-opacity-20 bg-background bg-opacity-95 pl-8 transition-all duration-300 md:hidden ${
            isMenu ? ' translate-y-0' : ' translate-y-full'
          }`}
        >
          <div className='flex-none'>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.href != router.pathname ? (
                  <a className='my-10 flex w-screen items-center font-medium text-white transition-all duration-300 hover:text-primary'>
                    {item.icon}
                    <p className='ml-2'>{item.name}</p>
                  </a>
                ) : (
                  <a className='my-10 flex items-center font-medium text-primary transition-all duration-300 hover:text-primary'>
                    {item.icon}
                    <p className='ml-2'>{item.name}</p>
                  </a>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
