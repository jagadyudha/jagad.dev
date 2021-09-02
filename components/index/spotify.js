function spotify({ spotify }) {
  return (
    <div className="mb-16 container">
      <h1 className="font-sans font-bold dark:text-white text-black sm:text-4xl text-3xl mb-1">
        Top Tracks
      </h1>
      <p className="font-sans font-normal sm:text-lg text-md dark:text-gray-300 text-gray-700 mb-10">
        what i'm currently listening.
      </p>

      <div>
        {spotify["items"].slice(0, 5).map((item, index) => (
          <div key={item.track.name}>
            <a
              target="_blank"
              href={item.track.external_urls.spotify}
              className="flex my-5"
            >
              <p className="font-sans font-normal dark:text-gray-300 text-gray-700 text-lg my-auto mr-5">
                {index + 1}
              </p>
              <img
                className="w-10 h-10 mr-3 my-auto rounded-md"
                src={item.track.album.images[0].url}
              ></img>
              <div>
                <p className="font-sans font-semibold dark:text-white text-black sm:text-lg text-md">
                  {item.track.name}
                </p>
                <p className="sm:text-lg text-md font-sans font-normal dark:text-gray-300 text-gray-700">
                  {item.track.artists[0].name}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default spotify;
