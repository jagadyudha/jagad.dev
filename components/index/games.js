function games({ items }) {
  return (
    <section className="mb-16 container">
      <h1 className="font-sans font-bold dark:text-white text-black sm:text-4xl text-3xl mb-1">
        Recently Played
      </h1>
      <p className="font-sans font-normal sm:text-lg text-md dark:text-gray-300 text-gray-700 mb-10">
        Sometimes i play video games.
      </p>

      <div className="grid grid-cols-none gap-4 sm:grid-cols-2">
        {items["response"]["games"].slice(0, 4).map((item) => (
          <div
            key={item.appid}
            className="border dark:border-white dark:border-opacity-20 border-black border-opacity-20 sm:p-5 p-2 rounded-md hover:bg-mybglight dark:hover:bg-mybg"
          >
            <a
              target="_blank"
              rel="noopener"
              rel="noreferrer"
              href="https://steamcommunity.com/profiles/76561198324704779/"
            >
              <h1 className="font-sans font-normal dark:text-gray-300 text-gray-700 text-md sm:text-lg mx-2">
                {item.name}
              </h1>
              <p className="font-sans mx-2 font-bold dark:text-white text-black text-lg md:text-2xl">
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
