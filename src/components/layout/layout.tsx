'use client';

import React from 'react';
import 'react-image-lightbox/style.css';

import { Inter } from '@next/font/google';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
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
    <html lang='en'>
      <Head>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-1510507608200585",
            enable_page_level_ads: true
            });
            `,
          }}
        />
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/favicon/apple-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/favicon/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/favicon/apple-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/favicon/apple-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/favicon/apple-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/favicon/apple-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/favicon/apple-icon-144x144.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/favicon/apple-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-icon-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/favicon/android-icon-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/favicon/favicon-96x96.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/manifest.json' />
        <meta name='msapplication-TileColor' content='#171717' />
        <meta
          name='msapplication-TileImage'
          content='/favicon/ms-icon-144x144.png'
        />
        <meta name='theme-color' content='#171717' />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Script
        async
        defer
        data-website-id='9431b762-4519-49ab-a53c-e338f465c833'
        src='https://analytics.jagad.dev/umami.js'
      />
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
    </html>
  );
}
