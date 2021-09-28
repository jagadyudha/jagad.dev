import Image from 'next/image';

const Spotify = ({ items }) => {
  const dataItems = items['items'];
  return (
    <div className='mb-16 container'>
      <h1 className='font-sans font-bold text-white  sm:text-4xl text-3xl mb-1'>
        Top Tracks
      </h1>
      <p className='font-sans font-normal sm:text-lg text-md text-gray-300  mb-10'>
        what I&apos;m currently listening.
      </p>

      <div>
        {dataItems.slice(0, 5).map((item, index) => {
          const trackName = item.track.name;
          const trackImg = item.track.album.images[0].url;
          const trackUrl = item.track.external_urls.spotify;
          const trackArtist = item.track.artists[0].name;
          return (
            <div key={item.track.name}>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={trackUrl}
                className='flex my-5'
              >
                <p className='font-sans font-normal text-gray-300  text-lg my-auto mr-5'>
                  {index + 1}
                </p>
                <div className='mr-3 my-auto'>
                  <Image
                    layout='fixed'
                    width={44}
                    height={44}
                    className='rounded-md mr-3'
                    src={trackImg}
                    alt={trackName}
                  ></Image>
                </div>
                <div>
                  <p className='font-sans font-semibold text-white  sm:text-lg text-md'>
                    {trackName.length > 40
                      ? `${trackName.slice(0, 40)}...`
                      : trackName}
                  </p>
                  <p className='sm:text-lg text-md font-sans font-normal text-gray-300'>
                    {trackArtist}
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spotify;
