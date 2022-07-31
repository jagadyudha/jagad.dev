import useSWR from 'swr';

export const NowPlaying = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/nowplaying', fetcher, {
    refreshInterval: 20000,
  });

  return (
    <div className='-my-1 flex min-h-[70px] max-w-md items-center justify-center'>
      <div className='flex w-full items-center justify-start rounded-lg'>
        <div className='flex items-center'>
          <svg
            className='text-lg text-green-500'
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 496 512'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z'></path>
          </svg>
        </div>
        {data ? (
          <div className='md:text-md ml-2 font-sans text-sm text-white'>
            {data?.music.is_playing ? (
              <a
                className='hover:text-primary'
                href={data?.music.getUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {`${
                  data?.music.getData.length > 30
                    ? `${data?.music.getData.slice(0, 30)}...`
                    : data?.music.getData
                }`}
              </a>
            ) : (
              <p>
                <span className='mr-1 text-sm font-light text-gray-300'>
                  Spotifty -
                </span>
                Not Playing
              </p>
            )}
          </div>
        ) : (
          <div className='ml-2 h-4 w-full animate-pulse rounded-sm bg-zinc-600'></div>
        )}
      </div>
    </div>
  );
};
