//components
import Layout from '@/components/layout/layout';

//lib
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '@/lib/seo';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import Script from 'next/script';
import nprogress from 'nprogress';
import { motion } from 'framer-motion';

//css
import 'react-image-lightbox/style.css';
import '../styles/globals.css';
import '../styles/nprogress.css';
import '../styles/twemoji.css';
import '../styles/fonts.css';
import '../styles/mdx.css';
import '../styles/prism.css';

//static
import DataSeo from '@/_data/seo.json';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const router = useRouter();

  Router.events.on('routeChangeStart', nprogress.start);
  Router.events.on('routeChangeError', nprogress.done);
  Router.events.on('routeChangeComplete', nprogress.done);

  return (
    <ThemeProvider attribute='class'>
      <DefaultSeo
        title={DataSeo.title}
        description={DataSeo.description}
        canonical={DataSeo.url}
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <Script
        async
        defer
        data-website-id='9431b762-4519-49ab-a53c-e338f465c833'
        src='https://analytics.jagad.dev/umami.js'
      />
      <Layout key={router.pathname}>
        {![`/posts/[slug]`].includes(appProps.router.pathname) ? (
          <motion.main
            initial='pageInitial'
            animate='pageAnimate'
            variants={{
              pageInitial: { opacity: 0 },
              pageAnimate: { opacity: 1 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='mx-auto my-8 max-w-6xl px-3 xs:px-6 sm:my-12 md:px-24 lg:my-12 xl:my-20 xl:px-0'
          >
            <Component {...pageProps} />
          </motion.main>
        ) : (
          <motion.main
            initial='pageInitial'
            animate='pageAnimate'
            variants={{
              pageInitial: { opacity: 0 },
              pageAnimate: { opacity: 1 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <Component {...pageProps} />
          </motion.main>
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
