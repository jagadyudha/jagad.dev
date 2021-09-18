import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_PROJECT,
    accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
  });

  const res = await client.getEntries({ content_type: "photo" });

  return {
    props: {
      photos: res.items,
    },
    revalidate: 1,
  };
}
function index({ photos }) {
  return (
    <div>
      <h1 className="font-sans font-bold dark:text-white text-black sm:text-5xl text-3xl">
        Photos
      </h1>

      <div>
        {photos.map((item) => (
          <div key={item.fields.title}>
            <div className="dark:bg-mybg bg-mybglight shadow-xl pb-10 my-10 sm:my-20 rounded-md">
              <a href={"/photos/" + item.fields.slug}>
                <div>
                  <img
                    src={"https:" + item.fields.img[0].fields.file.url}
                    className="w-full pb-2 rounded-t-md mb-5"
                  />

                  <h1 className="font-sans font-bold dark:text-white text-black sm:text-lg text-md mx-5">
                    {item.fields.title}
                  </h1>
                  <p className="sm:text-lg text-md font-sans font-normal dark:text-gray-300 text-gray-700 mx-5 ">
                    {item.fields.desc}
                  </p>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default index;
