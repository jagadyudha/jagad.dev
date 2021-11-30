import useSWR from 'swr';
import Image from '@/components/image';
import { FaFileImage } from 'react-icons/fa';
const Games = ({ items }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/playersummaries', fetcher);

  return (
    <section className='mb-16 container'>
      <h1 className='font-sans font-bold text-white sm:text-4xl text-3xl mb-1'>
        Game Activity
      </h1>
      <p className='font-sans font-normal sm:text-lg text-md text-gray-300 mb-10'>
        Sometimes I play video games.
      </p>
      <a
        href='https://steamcommunity.com/profiles/76561198324704779/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='rounded-lg items-center pt-2 bg-gradient-to-tr from-mybg to-myorangelight'>
          <div className='mx-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='flex py-6 my-auto rounded-md'>
              <div className='my-auto ml-5 mr-4'>
                <div className='w-20 h-20 flex items-center justify-center rounded-lg'>
                  {data?.steam.getAvatar ? (
                    <Image
                      className='rounded-lg'
                      src={data?.steam.getAvatar}
                      width={100}
                      height={100}
                      alt='steam profil picture'
                    />
                  ) : (
                    <FaFileImage className='w-12 h-12 mx-auto text-center p-3 text-white opacity-50' />
                  )}
                </div>
              </div>
              <div className='my-auto mr-3'>
                <p className='text-md sm:text-lg text-gray-200'>
                  {data?.steam.getPersonName ? data?.steam.getPersonName : '~'}
                  <div className='text-md font-semibold sm:text-lg text-white'>
                    {data?.steam.getGames === false ? (
                      <p>
                        {data?.steam.getStatus ? data?.steam.getStatus : '-'}
                      </p>
                    ) : (
                      <p className='text-green-500 drop-shadow-2xl '>
                        {data?.steam.getGames}
                      </p>
                    )}
                  </div>
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 px-2 py-2'>
            {items['response']['games'].slice(0, 2).map((item) => (
              <a
                key={item.appid}
                target='_blank'
                rel='noopener noreferrer'
                href={`https://store.steampowered.com/app/${item.appid}`}
              >
                <div className='rounded-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg'>
                  <img
                    className='rounded-lg w-full opacity-70 grayscale hover:grayscale-0 transition duration-300'
                    src={`http://media.steampowered.com/steamcommunity/public/images/apps/${item.appid}/${item.img_logo_url}.jpg`}
                  />
                  {/* <div className='sm:p-3 p-2'>
                    <p className='font-sans mx-2 font-semibold text-white text-md md:text-lg'>
                      {parseInt(item.playtime_forever / 60) + 1} Hours
                    </p>
                  </div> */}
                </div>
              </a>
            ))}
          </div>
        </div>
      </a>
      {/* <div className='grid grid-cols-1 gap-3'>
        {items['response']['games'].slice(0, 2).map((item) => (
          <a
            key={item.appid}
            target='_blank'
            rel='noopener noreferrer'
            href={`https://store.steampowered.com/app/${item.appid}`}
          >
            <div className='border border-opacity-20 sm:p-5 p-2 rounded-md hover:bg-mybg'>
              <h1 className='font-sans font-normal text-gray-300 text-md sm:text-lg mx-2'>
                {item.name}
              </h1>
              <p className='font-sans mx-2 font-semibold text-white text-md md:text-lg'>
                {parseInt(item.playtime_forever / 60) + 1} Hours
              </p>
            </div>
          </a>
        ))}
      </div> */}
    </section>
  );
};

export default Games;
