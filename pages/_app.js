import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/layout';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import DataSeo from '@/_data/seo.json';
import { cardOpenGraph, cardTwitter } from '../lib/seo';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS, {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute='class'>
      <DefaultSeo
        title={DataSeo.title}
        description={DataSeo.description}
        canonical={DataSeo.url}
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS}', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
      <Layout key={router.asPath}>
        <motion.main
          initial='pageInitial'
          animate='pageAnimate'
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
          className='max-w-2xl px-8 mx-auto my-8 sm:my-14'
        >
          <Component {...pageProps} />
        </motion.main>
      </Layout>
    </ThemeProvider>
  );
}
