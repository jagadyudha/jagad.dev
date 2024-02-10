'use client';

import React from 'react';
import 'react-image-lightbox/style.css';

import { Inter } from '@next/font/google';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
// import Script from 'next/script';
import nprogress from 'nprogress';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

import '../../../styles/globals.css';
import '../../../styles/mdx.css';
import '../../../styles/nprogress.css';
import '../../../styles/prism.css';
import '../../../styles/twemoji.css';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: any;
  }
}

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const isBlogPost = [`/posts/`, '/projects/'].some((prefix) =>
    pathname.startsWith(prefix),
  );
  React.useEffect(() => {
    nprogress.start();
  }, [pathname]);

  React.useEffect(() => {
    nprogress.done();
  }, [searchparams]);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {/* <Script
        async
        defer
        data-website-id='9431b762-4519-49ab-a53c-e338f465c833'
        src='https://analytics.jagad.dev/umami.js'
      /> */}
      <body className='background-core'>
        <Navbar />
        <motion.main
          key={pathname}
          initial='pageInitial'
          animate='pageAnimate'
          variants={{
            pageInitial: { opacity: 0 },
            pageAnimate: { opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={clsx(
            !isBlogPost &&
              'mx-auto my-8 max-w-[74rem] px-3 xs:px-6 sm:my-12 md:px-24 lg:my-12 lg:px-8 xl:my-20',
          )}
        >
          {children}
        </motion.main>
        <Footer />
      </body>
    </>
  );
}
