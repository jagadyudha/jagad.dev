import Image from 'next/image';
import { getContentful } from '../../lib/contentful';

export const getStaticProps = async () => {
  const res = await getContentful('photo');
  return {
    props: {
      photos: res.data.items,
    },
    revalidate: 1,
  };
};

const index = ({ photos }) => {
  return (
    <div>
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        Photos
      </h1>
      <div>
        {photos.map((item) => {
          const contentTitle = item.fields.title;
          const contentUrl = `photos/${item.fields.slug}`;
          const contentImg = `https:${item.fields.img[0].fields.file.url}`;
          const contentDesc = item.fields.desc;
          return (
            <div key={contentTitle}>
              <div className='bg-mybg shadow-xl pb-10 my-10 sm:my-20 rounded-md'>
                <a href={contentUrl}>
                  <Image
                    width={500}
                    height={500}
                    layout='responsive'
                    src={contentImg}
                    alt={item.fields.title}
                    className='rounded-t-md'
                  />

                  <h1 className='font-sans font-bold text-white sm:text-lg text-md mx-5 my-5'>
                    {contentTitle}
                  </h1>
                  <p className='sm:text-lg text-md font-sans font-normal text-gray-300 mx-5 '>
                    {contentDesc}
                  </p>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
