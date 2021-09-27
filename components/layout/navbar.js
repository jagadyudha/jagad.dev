import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSpotify } from 'react-icons/fa';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Project', href: 'projects' },
  { name: 'Photo', href: 'photos' },
  { name: 'Linktree', href: 'linktree' },
];

export default function navbar() {
  return (
    <div className='sticky top-0 z-50 bg-mydark  backdrop-filter backdrop-blur-lg bg-opacity-60'>
      <Popover>
        <div className='sm:py-2 py-0'>
          <nav className='flex max-w-3xl mx-auto text-center sm:text-right py-4 items-center justify-between px-5'>
            <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
              <div className='flex items-center justify-between w-full md:w-auto'>
                <div className='flex'>
                  <FaSpotify className='text-[#1DB954] text-xl my-auto mr-5' />
                  <div className='my-auto text-left'>
                    <p className='font-sans font-normal text-white sm:text-lg text-md'>
                      Playing - Girls Day
                    </p>
                  </div>
                </div>
                <div className='-mr-2 flex items-center md:hidden'>
                  <Popover.Button className='bg-mybg rounded-md p-2 inline-flex items-center justify-center text-gray-300 hove:bg-opacity-80'>
                    <GiHamburgerMenu className='text-2xl' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='hidden md:block md:ml-10 md:pr-4 md:space-x-8'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='font-medium text-gray-200 hover:text-myorange'
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
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
            className='absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
          >
            <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
              <div className='float-right px-5 pt-4 flex items-center justify-between'>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <div>peler</div>
                  </Popover.Button>
                </div>
              </div>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href='#'
                className='block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100'
              >
                Log in
              </a>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
