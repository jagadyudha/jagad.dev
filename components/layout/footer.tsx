import React from 'react';
import { NowPlaying } from '@/components/now-playing';
import Link from '@/components/customLink';

function footer() {
  return (
    <footer className='bg-[#1a1a1c]'>
      {/* Licensed under the MIT License. */}
      <div className='mx-8 max-w-6xl flex-none justify-between py-10 md:mx-24 xl:mx-auto xl:flex xl:flex-row-reverse'>
        {/* Nav Link */}
        <div className='grid grid-cols-2 gap-10 text-left sm:grid-cols-3 sm:text-center xl:gap-24 xl:py-0 xl:text-left'>
          {nav.map((item) => (
            <div key={item.menu}>
              <p className='font-medium text-white'>
                {item.menu.toUpperCase()}
              </p>
              {item.content.map((item, index) => (
                <div key={index}>
                  <Link href={item.href}>
                    <p className='my-4 text-gray-400 hover:text-primary hover:underline'>
                      {item.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className='mt-10 flex justify-center text-center xl:mt-0 xl:justify-between xl:text-left'>
          <div>
            <div className='mb-4 rounded-md border border-white border-opacity-20 px-3'>
              <NowPlaying />
            </div>

            <div className='text-xs text-gray-400 sm:text-sm'>
              <p>
                Content licensed under{' '}
                <Link href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>
                  <span className='text-primary hover:underline'>
                    CC BY-NC-SA 4.0
                  </span>
                </Link>
                .
              </p>
              <p className=' text-gray-400'>
                <Link href='https://github.com/jagadyudha/jagad.dev/blob/master/LICENSE.md'>
                  <span className='text-primary hover:underline'>
                    MIT License
                  </span>
                </Link>
                {` © ${new Date().getFullYear()} Jagad Yudha`}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const nav = [
  {
    menu: 'Social',
    content: [
      { name: 'Twitter', href: 'https://twitter.com/imyour_universe' },
      { name: 'Github', href: 'https://github.com/jagadyudha/jagadyudha' },
      {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/in/jagad-yudha-39a4a51b6/',
      },
      {
        name: 'Youtube',
        href: 'https://www.youtube.com/c/noobsecurity_/videos',
      },
      { name: 'PolyWork', href: 'https://www.polywork.com/imyour_universe' },
    ],
  },

  {
    menu: 'General',
    content: [
      { name: 'Home', href: '/' },
      { name: 'Posts', href: '/posts' },
      { name: 'Projects', href: '/projects' },
      { name: 'Activities', href: '/activities' },
      { name: 'About', href: '/about' },
    ],
  },
  {
    menu: 'Extra',
    content: [
      { name: 'Source Code', href: 'https://github.com/jagadyudha/jagad.dev' },
      {
        name: 'Newsletter',
        href: 'https://www.getrevue.co/profile/imyour_universe',
      },
      { name: 'Resume', href: '/' },
    ],
  },
];

export default footer;
