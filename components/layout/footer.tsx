import React from 'react';
import { NowPlaying } from '@/components/now-playing';
import Link from '@/components/customLink';

function footer() {
  return (
    <footer className='bg-background_dark opacity-80 duration-300 hover:opacity-100'>
      {/* Licensed under the MIT License. */}
      <div className='mx-auto max-w-6xl flex-none justify-between px-3 py-10 xs:px-6 md:px-24 lg:flex lg:flex-row-reverse  xl:px-0'>
        {/* Nav Link */}
        <div className='grid grid-cols-2 gap-10 text-left sm:grid-cols-3 sm:text-center lg:py-0 lg:text-left xl:gap-24'>
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

        <div className='mt-10 flex justify-center  text-center xl:mt-0 xl:justify-between xl:text-left'>
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
      { name: 'Github', href: 'https://github.com/jagadyudha' },
      {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/in/jagad-yudha-39a4a51b6/',
      },
      {
        name: 'Dribbble',
        href: 'https://dribbble.com/jagadyudha',
      },
      { name: 'Polywork', href: 'https://www.polywork.com/imyour_universe' },
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
      {
        name: 'Resume',
        href: 'https://drive.google.com/file/d/1MWmVGVdnE83fggTb8PTbx7rVwChjuqD-/view?usp=sharing',
      },
      { name: 'Source Code', href: 'https://github.com/jagadyudha/jagad.dev' },
      {
        name: 'Analytics',
        href: 'https://analytics.jagad.dev/share/PEGBLHu0/jagad.dev',
      },
      { name: 'Storybook', href: 'https://storybook.jagad.dev/' },
      {
        name: 'Reading List',
        href: 'https://jagadyudha.notion.site/jagadyudha/Reading-List-e5a47c93a900407e882db9b8989c605d',
      },
    ],
  },
];

export default footer;
