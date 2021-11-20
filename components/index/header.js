import Link from 'next/link';

const Header = () => {
  return (
    <div className='mb-16'>
      <h1 className='font-sans font-bold text-myorange sm:text-5xl text-3xl my-1'>
        Jagad Yudha Awali
      </h1>
      <div className='font-sans flex-1 sm:text-lg text-md text-gray-300 my-5'>
        I&apos;m a software engineer & ui/ux designer based on sidoarjo,
        indonesia. Interested working on frontend and currently learning about
        react.Js & ract native. If you want to work with me or ask something,
        reach me via{' '}
        <Link
          href='mailto:jagadyudhaawali@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <a className='text-myorange underline hover:opacity-50'>email</a>
        </Link>{' '}
        or check my{' '}
        <Link href='/linktree' target='_blank' rel='noopener noreferrer'>
          <a className='text-myorange underline hover:opacity-50'>Linktree</a>
        </Link>{' '}
        for other social media.
      </div>
    </div>
  );
};

export default Header;
