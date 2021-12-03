import Link from 'next/link';

const Header = () => {
  return (
    <div className='mb-16'>
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl my-1'>
        Jagad Yudha Awali
      </h1>
      <p className='font-sans flex-1 sm:text-lg text-md text-gray-300 my-5'>
        {`I'm a front-end developer and UI/UX designer based in Sidoarjo,
        Indonesia. I'm interested in front-end development and  currently
        learning about React technology. If you want to work with me or ask
        something, reach me via `}
        <a
          href='https://twitter.com/imyour_universe'
          target='_blank'
          rel='noopener noreferrer'
        >
          <a className='text-myorange underline hover:opacity-50'>twitter</a>
        </a>{' '}
        or check my{' '}
        <Link href='/linktree'>
          <a className='text-myorange underline hover:opacity-50'>Linktree</a>
        </Link>{' '}
        for other social media.
      </p>
    </div>
  );
};

export default Header;
