import React from 'react';
import { NowPlaying } from '@/components/nowPlaying';
import Link from '@/components/customLink';

function footer() {
  return (
    <footer className='relative'>
      <div className='mx-auto max-w-6xl flex-none justify-between px-3 py-10 xs:px-6 md:px-24 lg:flex lg:flex-row-reverse  xl:px-0 z-[2] relative'>
        {/* Nav Link */}
        <div className='grid grid-cols-2 gap-10 text-left sm:grid-cols-3 sm:text-center lg:py-0 lg:text-left xl:gap-24'>
          {nav.map((item) => (
            <div key={item.menu}>
              <p className='mb-2 font-semibold text-white'>
                {item.menu.toUpperCase()}
              </p>
              {item.content.map((item, index) => (
                <div key={index}>
                  <Link href={item.href}>
                    <p className='my-3 text-gray-400 hover:text-primary hover:underline'>
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
            <div className='mb-4 border border-gray-700 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg px-3'>
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
      { name: 'Github', href: 'https://github.com/jagadyudha' },
      { name: 'Twitter', href: 'https://twitter.com/imyour_universe' },
      {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/in/jagad-yudha-39a4a51b6/',
      },
    ],
  },

  {
    menu: 'General',
    content: [
      { name: 'Home', href: '/' },
      { name: 'Posts', href: '/posts' },
      { name: 'Projects', href: '/projects' },
      { name: 'About', href: '/about' },
    ],
  },
  {
    menu: 'Extra',
    content: [
      {
        name: 'Resume',
        href: 'https://drive.google.com/file/d/1MWmVGVdnE83fggTb8PTbx7rVwChjuqD-/view?usp=sharing',
      },
      {
        name: 'Analytics',
        href: 'https://analytics.jagad.dev/share/PEGBLHu0/jagad.dev',
      },
      { name: 'Source Code', href: 'https://github.com/jagadyudha/jagad.dev' },
      {
        name: 'Reading List',
        href: 'https://jagadyudha.notion.site/jagadyudha/Reading-List-e5a47c93a900407e882db9b8989c605d',
      },
    ],
  },
];

export default footer;
