import Image from 'next/image';
import { IoArrowForwardOutline } from 'react-icons/io5';
export interface SpotifyProps {
  items: any;
}

const Spotify: React.FC<SpotifyProps> = ({ items }) => {
  return (
    <div className='container mb-16'>
      <h2 className='font-sans text-xl font-bold text-white sm:text-3xl'>
        Top Tracks
      </h2>
      <p className='text-md my-2 mb-10 font-sans font-normal text-gray-400'>
        What I&apos;m currently listening to.
      </p>

      <div>
        {items.map((item: any, index: number) => {
          const trackName = item.track.name;
          const trackImg = item.track.album.images[0].url;
          const trackUrl = item.track.external_urls.spotify;
          const trackArtist = item.track.artists[0].name;
          return (
            <div
              key={index}
              className='border-b border-white border-opacity-10'
            >
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={trackUrl}
                className='my-5 flex'
              >
                <p className='my-auto mr-5 font-sans  text-lg font-normal text-gray-300'>
                  {index + 1}
                </p>
                <div className='my-auto mr-3'>
                  <Image
                    layout='fixed'
                    width={44}
                    height={44}
                    className='mr-3 rounded-md'
                    src={trackImg}
                    alt={trackName}
                  ></Image>
                </div>
                <div>
                  <p className='text-md font-sans font-semibold  text-white sm:text-lg'>
                    {trackName.length > 40
                      ? `${trackName.slice(0, 40)}...`
                      : trackName}
                  </p>
                  <p className='text-md font-sans font-normal text-gray-300 sm:text-lg'>
                    {trackArtist}
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <a
        href='https://open.spotify.com/user/zhof3odxndrrhfp6qxnga05ld'
        target='_blank'
        rel='noopener noreferrer'
        className='justify-left my-5 flex items-center text-center text-gray-300 transition-all duration-300 hover:text-white md:my-10'
      >
        <span className='text-md my-5 mr-2 font-sans font-normal'>
          View Spotify
        </span>
        <IoArrowForwardOutline className='text-2xl' />
      </a>
    </div>
  );
};

export default Spotify;
