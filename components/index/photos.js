import React from "react";

function photos({ photos }) {
  return (
    <div className="mb-16 container">
      <h1 className="font-sans font-bold dark:text-white text-black sm:text-4xl text-3xl mb-1">
        Latest Photo
      </h1>
      <p className="font-sans font-normal sm:text-lg text-md dark:text-gray-300 text-gray-700 mb-10">
        Collection of momment that i capture
      </p>

      <div>
        {photos.slice(0, 1).map((item) => (
          <div key={item.fields.title}>
            <div className="pb-5">
              <a href={"/photos/" + item.fields.slug}>
                <div>
                  <img
                    src={"https:" + item.fields.img[0].fields.file.url}
                    className="w-full rounded-md mb-5"
                  />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
      <a href="photos" className="justify-center flex flex-row text-center">
        <span className="font-sans font-semibold text-lg dark:text-myorange text-myorangelight mx-2 hover:underline">
          View all Photos ➔
        </span>
      </a>
    </div>
  );
}

export default photos;
