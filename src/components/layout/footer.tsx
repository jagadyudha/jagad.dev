import React from 'react';

import Spotify from '@/components/layout/spotify';
import Link from '@/components/shared/customLink';

import { dataFooter } from '@/libs/data';

function Footer() {
  return (
    <footer className='relative'>
      <div className='relative z-[2] mx-auto max-w-[74rem] md:px-24 lg:px-8 flex-none justify-between px-3 py-10 xs:px-6  lg:flex lg:flex-row-reverse'>
        <div className='grid grid-cols-2 gap-10 text-left sm:grid-cols-3 sm:text-center lg:py-0 lg:text-left xl:gap-24'>
          {dataFooter.map((item) => (
            <div key={item.menu}>
              <p className='mb-2 font-semibold text-white font-bold text-primary'>
                {item.menu.toUpperCase()}
              </p>
              {item.content.map((item, index) => (
                <div key={index}>
                  <Link href={item.href} className='bg-black'>
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
            <div className='mb-4 rounded-lg border border-gray-700 bg-white bg-opacity-5 px-3 backdrop-blur-lg'>
              <Spotify />
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

export default Footer;
