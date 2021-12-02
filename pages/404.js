import { NextSeo } from 'next-seo';

const ErrorCustomPage = () => {
  return (
    <div className='text-center justify-center items-center min-h-[55vh]'>
      <NextSeo title='404 - Jagad Yudha Awali' />
      <h1 className='text-4xl text-white font-bold'>404</h1>
      <p className='text-lg text-white font-normal'>{`Awwww... don't cry.`}</p>
    </div>
  );
};

export default ErrorCustomPage;
