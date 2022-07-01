import useSWR from 'swr';
import Image from '@/components/image';

export interface GameListProps {
  appid: number;
  name: string;
  playtime_forever: string;
  img_icon_url: string;
}

export interface GameProps {
  items: GameListProps[];
}

const Games: React.FC<GameProps> = ({ items }) => {
  return (
    <section className='mb-16'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {items.slice(0, 6).map((item: GameListProps) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://store.steampowered.com/app/${item.appid}`}
            key={item.appid}
            className='group relative h-full rounded-md bg-opacity-75  duration-150 ease-in-out'
          >
            <div className='absolute h-full w-full rounded-md opacity-80 duration-150 ease-in-out group-hover:opacity-100'>
              <Image
                className='rounded-md'
                src={`https://steamcdn-a.akamaihd.net/steam/apps/${item.appid}/header.jpg`}
                layout='fill'
                objectFit='cover'
                alt={item.name}
              />
            </div>
            <div className='relative z-0 flex h-full items-end rounded-md p-4 '>
              <div className=' rounded-mdl'>
                <h3 className='bg-black bg-opacity-80 p-1'>{item.name}</h3>

                <span className=' bg-black bg-opacity-80 p-1 text-gray-300'>
                  {(parseInt(item.playtime_forever) / 60 + 1) | 0} Hours
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Games;
