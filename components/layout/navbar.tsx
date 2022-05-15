import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscChromeClose } from 'react-icons/vsc';
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
    <nav className='z-50 mt-3 bg-opacity-50 '>
      <Popover>
        <div>
          <div className='mx-auto flex items-center justify-center py-3 px-5 text-center sm:py-6 xl:mx-20'>
            <div className='flex flex-shrink-0 flex-grow items-center lg:flex-grow-0'>
              <div className='flex w-full items-center justify-end md:w-auto'>
                <div className='-ml-2 flex items-center  md:hidden'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-opacity-80'>
                    <GiHamburgerMenu className='text-lg text-white' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='hidden text-lg md:ml-10 md:block md:space-x-16 md:pr-4'>
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  {item.href === checkSlug ? (
                    <a className='border-b-2 border-primary pb-1 text-white'>
                      {item.name}
                    </a>
                  ) : (
                    <a className='text-gray-400 hover:text-primary'>
                      {item.name}
                    </a>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden'
          >
            <div className='overflow-hidden rounded-lg bg-background_100 shadow-md ring-0'>
              <div className='float-right flex items-center justify-between px-5 pt-4'>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-background_100 p-2'>
                    <VscChromeClose className='text-lg text-white' />
                  </Popover.Button>
                </div>
              </div>
              <div className='space-y-1 px-4 pt-2 pb-3'>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    {item.href === checkSlug ? (
                      <a
                        href={item.href}
                        className='block rounded-md px-3 py-2 text-base font-normal text-white'
                      >
                        {item.name}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        className='block rounded-md px-3 py-2 text-base font-normal text-gray-300'
                      >
                        {item.name}
                      </a>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </nav>
  );
};

export default Navbar;
