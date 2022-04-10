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
    gtag: any;
  }
}

export default function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const router = useRouter();

  Router.events.on('routeChangeStart', nprogress.start);
  Router.events.on('routeChangeError', nprogress.done);
  Router.events.on('routeChangeComplete', nprogress.done);

  const handleRouteChange = (url: string) => {
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
      <Script
        async
        id='google-analytics'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
      />

      <Script
        id='google-analytics-init'
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS}', { page_path: window.location.pathname });
            `,
        }}
      />
      <Layout key={router.pathname}>
        <main className='mx-auto my-10 max-w-2xl px-6 sm:my-24 md:px-12 xl:px-0'>
          <Component {...pageProps} />
        </main>
      </Layout>
    </ThemeProvider>
  );
}
