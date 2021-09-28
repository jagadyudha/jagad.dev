import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/layout';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../lib/seo';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <DefaultSeo
        title='Jagad Yudha - Frontend Developer'
        description='website for collection all the best works I made as a front-end developer.'
        canonical='Jagad Yudha - Frontend Developer'
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <Layout>
        <div className='max-w-2xl px-8 mx-auto my-8 sm:my-14'>
          <Component {...pageProps} />
        </div>
      </Layout>
    </ThemeProvider>
  );
}
