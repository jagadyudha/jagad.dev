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
    <section className='container mb-16'>
      <a
        href='https://steamcommunity.com/profiles/76561198324704779/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='items-center rounded-lg border border-white border-opacity-10'>
          <div className='my-auto flex rounded-md py-6'>
            <div className='my-auto ml-5 mr-4 flex'>
              <div className='w-20 overflow-hidden rounded-lg'>
                {data?.steam.getAvatar && (
                  <Image
                    src={data?.steam.getAvatar}
                    layout={'responsive'}
                    width={'100%'}
                    height={'100%'}
                    alt='steam profil picture'
                  />
                )}
              </div>
              <div className='my-auto ml-3'>
                <p className='text-md text-white sm:text-xl'>
                  {data?.steam.getPersonName ? data?.steam.getPersonName : '~'}
                  <div className='text-md font-semibold text-white sm:text-lg'>
                    {data?.steam.getGames === false ? (
                      <p>
                        {data?.steam.getStatus ? data?.steam.getStatus : '-'}
                      </p>
                    ) : (
                      <p className='font-normal text-white'>
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
      <div className='mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2'>
        {items.slice(0, 2).map((item: GameListProps) => (
          <a
            key={item.appid}
            target='_blank'
            rel='noopener noreferrer'
            href={`https://store.steampowered.com/app/${item.appid}`}
          >
            <div className='rounded-md border border-white border-opacity-10 p-6'>
              <h2 className='text-md font-sans font-normal text-gray-300 sm:text-lg'>
                {item.name}
              </h2>
              <p className='text-md font-sans font-semibold text-white md:text-lg'>
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
