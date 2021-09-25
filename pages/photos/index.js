import Image from 'next/image';
import { contentfulFetch } from '../../helper/fetchdata';

export async function getStaticProps() {
  const res = await contentfulFetch('photo');
  return {
    props: {
      photos: res.data.items,
    },
    revalidate: 1,
  };
}

export default function index({ photos }) {
  return (
    <div>
      <h1 className='font-sans font-bold dark:text-white text-black sm:text-5xl text-3xl'>
        Photos
      </h1>

      <div>
        {photos.map((item) => (
          <div key={item.fields.title}>
            <div className='dark:bg-mybg bg-mybglight shadow-xl pb-10 my-10 sm:my-20 rounded-md'>
              <a href={'/photos/' + item.fields.slug}>
                <Image
                  width={500}
                  height={500}
                  layout='responsive'
                  src={'https:' + item.fields.img[0].fields.file.url}
                  alt={item.fields.title}
                  className='rounded-t-md'
                />

                <h1 className='font-sans font-bold dark:text-white text-black sm:text-lg text-md mx-5 my-5'>
                  {item.fields.title}
                </h1>
                <p className='sm:text-lg text-md font-sans font-normal dark:text-gray-300 text-gray-700 mx-5 '>
                  {item.fields.desc}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
