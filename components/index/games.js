function games({ items }) {
  return (
    <section className='mb-16 container'>
      <h1 className='font-sans font-bold text-white sm:text-4xl text-3xl mb-1'>
        Recently Played
      </h1>
      <p className='font-sans font-normal sm:text-lg text-md text-gray-300  mb-10'>
        Sometimes i play video games.
      </p>

      <div className='grid grid-cols-none gap-4 sm:grid-cols-2'>
        {items['response']['games'].slice(0, 4).map((item) => (
          <div
            key={item.appid}
            className='border border-white border-opacity-20 sm:p-5 p-2 rounded-md hover:hover:bg-mybg'
          >
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://steamcommunity.com/profiles/76561198324704779/'
            >
              <h1 className='font-sans font-normal text-gray-300  text-md sm:text-lg mx-2'>
                {item.name}
              </h1>
              <p className='font-sans mx-2 font-bold text-white  text-lg md:text-2xl'>
                {parseInt(item.playtime_forever / 60) + 1} Hours
              </p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default games;
