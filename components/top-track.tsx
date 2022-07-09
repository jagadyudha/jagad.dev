import Image from 'next/image';
export interface SpotifyProps {
  items: any;
}

const Spotify: React.FC<SpotifyProps> = ({ items }) => {
  return (
    <div className='grid grid-cols-1 gap-10  sm:grid-cols-2 lg:grid-cols-3'>
      {items.map((item: any, index: number) => {
        const trackName = item.track.name;
        const trackImg = item.track.album.images[0].url;
        const trackUrl = item.track.external_urls.spotify;
        const trackArtist = item.track.artists[0].name;
        return (
          <div key={index} className='border-b border-white border-opacity-10 '>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={trackUrl}
              className='my-5 flex sm:flex-none'
            >
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
                <p className='text-md -my-1 font-sans font-semibold  text-white sm:text-lg'>
                  {trackName.length > 40
                    ? `${trackName.slice(0, 40)}...`
                    : trackName}
                </p>
                <p className='text-md -my-1 font-sans font-normal text-gray-300 sm:text-lg'>
                  {trackArtist}
                </p>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Spotify;
