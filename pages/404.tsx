import Link from 'next/link';
import Twemoji from '@/components/Twemoji';
import Head from 'next/head';
const ErrorCustomPage = () => {
  return (
    <div className='flex min-h-[50vh] items-center justify-center text-center'>
      <Head>
        <title>404 — Jagad Yudha Awali</title>
      </Head>
      <div>
        <h1 className='text-4xl font-bold text-white'>404</h1>

        <p className='text-lg font-normal text-white'>
          {`There isn't a Pages site here.`} <Twemoji emoji='😜' />
        </p>
        <p className='my-4 text-lg font-normal text-primary'>
          <Link href='/'>
            <a> Go back home</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorCustomPage;
