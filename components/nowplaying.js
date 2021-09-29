import { FaSpotify } from 'react-icons/fa';
import useSWR from 'swr';

export const NowPlaying = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/nowplaying', fetcher);
  return (
    <div className='flex'>
      <FaSpotify className='text-[#1DB954] text-xl my-auto mr-5' />
      <div className='my-auto text-left'>
        <div className='font-sans font-normal text-white sm:text-lg text-md'>
          {data?.music.is_playing ? (
            <a
              className='hover:text-myorange'
              href={data?.music.getUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {`${data?.music.getData}`}
            </a>
          ) : (
            <div>Not Playing</div>
          )}
        </div>
      </div>
    </div>
  );
};
