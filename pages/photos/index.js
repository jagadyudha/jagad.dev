import Image from 'next/image';
import Link from 'next/link';
import { getContentful } from '../../lib/contentful';
import { NextSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../../lib/seo';
import { getPlaiceholder } from 'plaiceholder';

export const getStaticProps = async () => {
  const res = await getContentful('photo');
  const plaiceholders = await Promise.all(
    res.data.items.map(async (item) => {
      const { base64 } = await getPlaiceholder(
        `https:${item.fields.img[0].fields.file.url}`
      );

      return base64;
    })
  ).then((values) => values);

  return {
    props: {
      photos: res.data.items,
      plaiceholders,
    },
    revalidate: 1,
  };
};

const photos = ({ photos, plaiceholders }) => {
  return (
    <>
      <NextSeo
        title='Photo - Jagad Yudha'
        description='Collection of momment that I capture'
        canonical='Jagad Yudha - Frontend Developer'
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        Photos
      </h1>
      <div>
        {photos.map((item, index) => {
          const contentTitle = item.fields.title;
          const contentSlug = `photos/${item.fields.slug}`;
          const contentImgUrl = `https:${item.fields.img[0].fields.file.url}`;
          const contentDesc = item.fields.desc;
          return (
            <div
              key={contentTitle}
              className='bg-mybg shadow-xl pb-10 my-10 sm:my-20 rounded-md'
            >
              <Link href={contentSlug}>
                <a>
                  <Image
                    placeholder='blur'
                    blurDataURL={plaiceholders[index]}
                    width={500}
                    height={500}
                    layout='responsive'
                    src={contentImgUrl}
                    alt={contentTitle}
                    className='rounded-t-md'
                  />

                  <h1 className='font-sans font-bold text-white sm:text-lg text-md mx-5 my-5'>
                    {contentTitle}
                  </h1>
                  <p className='sm:text-lg text-md font-sans font-normal text-gray-300 mx-5 '>
                    {contentDesc}
                  </p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default photos;
