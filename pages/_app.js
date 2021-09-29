import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/layout';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../lib/seo';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ThemeProvider attribute='class'>
      <DefaultSeo
        title='Jagad Yudha - Frontend Developer'
        description='website for collection all the best works I made as a front-end developer.'
        canonical='Jagad Yudha - Frontend Developer'
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <Layout key={router.asPath}>
        <motion.div
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
        </motion.div>
      </Layout>
    </ThemeProvider>
  );
}
