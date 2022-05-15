import React from 'react';
import { NowPlaying } from '@/components/now-playing';
import SocialIcon from '@/components/social-icon';
import {
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiYoutube,
  FiInstagram,
} from 'react-icons/fi';

function footer() {
  return (
    <footer className='bg-[#1a1a1c]'>
      {/* Licensed under the MIT License. */}
      <div className='mx-8 max-w-6xl flex-none justify-between  py-20 md:mx-24 xl:mx-auto xl:flex'>
        <div className='flex justify-center text-center xl:justify-between xl:text-left'>
          <div>
            <div className='mb-4 rounded-md border border-white border-opacity-20 px-3'>
              <NowPlaying />
            </div>

            <div className='text-xs text-gray-400 sm:text-sm'>
              <p>
                Content licensed under{' '}
                <a
                  target='_blank'
                  rel='noreferrer noopener'
                  className='text-primary hover:underline'
                  href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
                >
                  CC BY-NC-SA 4.0
                </a>
                .
              </p>
              <p className=' text-gray-400'>
                <a
                  target='_blank'
                  rel='noreferrer noopener'
                  className='text-primary hover:underline'
                  href='https://github.com/jagadyudha/jagad.dev/blob/main/LICENSE.md'
                >
                  MIT License
                </a>
                {` © ${new Date().getFullYear()} Jagad Yudha`}.
              </p>
            </div>
          </div>
        </div>

        {/* Nav Link */}
        <div className='hidden grid-cols-2 gap-10 py-14 sm:grid-cols-3 xl:grid xl:gap-24 xl:py-0'>
          {nav.map((item) => (
            <div key={item.menu} className='mx-auto'>
              <p className='font-medium text-white'>
                {item.menu.toUpperCase()}
              </p>
              {item.content.map((item, index) => (
                <p key={index} className='my-4 text-gray-400'>
                  {item.name}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

const nav = [
  {
    menu: 'Social',
    content: [
      { name: 'Twitter', href: 'https' },
      { name: 'Github', href: 'https' },
      { name: 'Linkedin', href: 'https' },
      { name: 'Youtube', href: 'https' },
      { name: 'PolyWork', href: 'https' },
    ],
  },

  {
    menu: 'General',
    content: [
      { name: 'Home', href: 'https' },
      { name: 'Posts', href: 'https' },
      { name: 'Projects', href: 'https' },
      { name: 'Activities', href: 'https' },
      { name: 'About', href: 'https' },
    ],
  },
  {
    menu: 'Extra',
    content: [
      { name: 'Twitter', href: 'https' },
      { name: 'Github', href: 'https' },
      { name: 'Linkedin', href: 'https' },
    ],
  },
];

export default footer;
