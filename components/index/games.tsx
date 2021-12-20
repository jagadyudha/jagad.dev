import useSWR from 'swr';
import Image from '@/components/image';
import { FaFileImage } from 'react-icons/fa';

export interface GameListProps {
  appid: number;
  name: string;
  playtime_forever: string;
}

export interface GameProps {
  items: GameListProps[];
}

const Games: React.FC<GameProps> = ({ items }) => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
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
        <div className='rounded-lg items-center bg-hero-pattern'>
          <div className='rounded-md bg-black hover:bg-transparent transition duration-500 bg-opacity-30 backdrop-filter backdrop-blur-xs'>
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
        </div>
      </a>
      <div className='grid xl:grid-cols-2 grid-cols-1 gap-3 mt-3'>
        {items.slice(0, 2).map((item: GameListProps) => (
          <a
            key={item.appid}
            target='_blank'
            rel='noopener noreferrer'
            href={`https://store.steampowered.com/app/${item.appid}`}
          >
            <div className='border border-opacity-20 sm:p-5 p-2 rounded-md hover:bg-mybg transition duration-300'>
              <h2 className='font-sans font-normal text-gray-300 text-md sm:text-lg mx-2'>
                {item.name}
              </h2>
              <p className='font-sans mx-2 font-semibold text-white text-md md:text-lg'>
                {(parseInt(item.playtime_forever) / 60 + 1) | 0} Hours
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Games;