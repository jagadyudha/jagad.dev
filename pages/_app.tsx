//components
import Layout from '@/components/layout/layout';

//lib
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '@/lib/seo';
import Router, { useRouter } from 'next/router';
import type { AppProps /*, AppContext */ } from 'next/app';
import Script from 'next/script';
import nprogress from 'nprogress';
import { motion } from 'framer-motion';
import { Inter } from '@next/font/google';
import clsx from 'clsx';

//css
import 'react-image-lightbox/style.css';
import '../styles/globals.css';
import '../styles/nprogress.css';
import '../styles/twemoji.css';
import '../styles/mdx.css';
import '../styles/prism.css';

//static
import DataSeo from '@/_data/seo.json';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const router = useRouter();

  Router.events.on('routeChangeStart', nprogress.start);
  Router.events.on('routeChangeError', nprogress.done);
  Router.events.on('routeChangeComplete', nprogress.done);

  // check if content inside blog post
  const isBlogPost = [`/posts/[slug]`, '/projects/[slug]'].includes(
    appProps.router.pathname
  );

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
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Layout key={router.pathname}>
        {
          <motion.div
            initial='pageInitial'
            animate='pageAnimate'
            variants={{
              pageInitial: { opacity: 0 },
              pageAnimate: { opacity: 1 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={clsx(
              !isBlogPost &&
                'mx-auto my-8 max-w-[74rem] px-3 xs:px-6 sm:my-12 md:px-24 lg:my-12 xl:my-20 lg:px-8'
            )}
          >
            <Component {...pageProps} />
          </motion.div>
        }
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
