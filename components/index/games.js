import useSWR from 'swr';

const Games = ({ items }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/playersummaries', fetcher);

  return (
    <section className='mb-16 container'>
      <h1 className='font-sans font-bold text-white sm:text-4xl text-3xl mb-1'>
        Game Activity
      </h1>
      <p className='font-sans font-normal sm:text-lg text-md text-gray-300  mb-10'>
        Sometimes i play video games.
      </p>
      <a
        href='https://steamcommunity.com/profiles/76561198324704779/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='bg-[#2a475e] rounded-lg hover:bg-opacity-70 mb-3'>
          <div className='flex rounded-md py-5 my-auto'>
            <div className='my-auto ml-5 mr-3'>
              <div className='w-20 h-20'>
                {data?.steam.getAvatar ? (
                  <img src={data?.steam.getAvatar}></img>
                ) : (
                  <div className='w-20 h-20'></div>
                )}
              </div>
            </div>
            <div className='my-auto mr-3'>
              <p className='text-md sm:text-lg text-gray-200'>
                {data?.steam.getPersonName}
              </p>
              <div className='text-md font-semibold sm:text-lg text-white'>
                {data?.steam.getGames === false ? (
                  <p>{data?.steam.getStatus}</p>
                ) : (
                  <p className='text-[#1DB954]'>{data?.steam.getGames}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
      <div className='grid grid-cols-1 gap-3'>
        {items['response']['games'].slice(0, 2).map((item) => (
          <div
            key={item.appid}
            className='border border-opacity-20 sm:p-5 p-2 rounded-md'
          >
            <h1 className='font-sans font-normal text-gray-300 text-md sm:text-lg mx-2'>
              {item.name}
            </h1>
            <p className='font-sans mx-2 font-semibold text-white text-md md:text-lg'>
              {parseInt(item.playtime_forever / 60) + 1} Hours
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Games;
