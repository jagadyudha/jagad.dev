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
import Head from 'next/head';

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
  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  Router.events.on('routeChangeStart', nprogress.start);
  Router.events.on('routeChangeError', nprogress.done);
  Router.events.on('routeChangeComplete', nprogress.done);

  //blacklist from layouting
  if ([`/og`].includes(appProps.router.pathname))
    return <Component {...pageProps} />;

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
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1510507608200585'
          crossOrigin='anonymous'
        />
      </Head>
      <Script
        async
        defer
        data-website-id='9431b762-4519-49ab-a53c-e338f465c833'
        src='https://analytics.jagad.dev/umami.js'
      />
      <Layout key={router.pathname}>
        <main className='mx-auto my-10 max-w-6xl px-6 sm:my-20 md:px-24 xl:px-0'>
          <Component {...pageProps} />
        </main>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
