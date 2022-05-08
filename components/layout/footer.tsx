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
    <footer className='mx-8 max-w-3xl text-center sm:mx-auto'>
      <NowPlaying />
      <div className='my-3 flex justify-center'>
        {social.map((item, index) => (
          <SocialIcon key={index} href={item.href}>
            {item.children}
          </SocialIcon>
        ))}
      </div>

      <div className='pt-10 pb-10 text-xs text-gray-400 sm:text-sm'>
        <p className='mb-4'>
          Content licensed under{' '}
          <a
            target='_blank'
            rel='noreferrer noopener'
            className='text-primary underline'
            href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
          >
            CC BY-NC-SA 4.0
          </a>
          .
        </p>
        Powered by{' '}
        <a
          target='_blank'
          rel='noreferrer noopener'
          className='text-primary underline'
          href='https://nextjs.org/'
        >
          Next.js
        </a>{' '}
        +{' '}
        <a
          target='_blank'
          rel='noreferrer noopener'
          className='text-primary underline'
          href='https://tailwindcss.com/'
        >
          Tailwind
        </a>
        . Hosted on{' '}
        <a
          target='_blank'
          rel='noreferrer noopener'
          className='text-primary underline'
          href='https://www.netlify.com/'
        >
          Netlify
        </a>
        .
        <p className=' text-gray-400'>
          Code licensed under{' '}
          <a
            target='_blank'
            rel='noreferrer noopener'
            className='text-primary underline'
            href='https://github.com/jagadyudha/jagad.dev/blob/main/LICENSE.md'
          >
            MIT License
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

const social = [
  { children: <FiTwitter />, href: 'https://twitter.com/imyour_universe' },
  { children: <FiGithub />, href: 'https://github.com/jagadyudha' },
  {
    children: <FiLinkedin />,
    href: 'https://www.linkedin.com/in/jagad-yudha-39a4a51b6/',
  },
  {
    children: <FiYoutube />,
    href: 'https://www.youtube.com/channel/UChxSF_3EXmlI5TwHOSoc8vQ',
  },
  {
    children: <FiInstagram />,
    href: 'https://www.instagram.com/imyour_universe/',
  },
];

export default footer;
