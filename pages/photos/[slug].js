import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { getContentful, getSlugContentful } from '../../lib/contentful';

export const getStaticPaths = async () => {
  const res = await getContentful('photo');
  const paths = res.data.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const items = await getSlugContentful('photo', params.slug);
  return {
    props: {
      photos: items.data.items[0],
    },
    revalidate: 1,
  };
};

const photosSlug = ({ photos }) => {
  if (!photos) return <div>Loading...</div>;
  const contentTitle = photos.fields.title;
  const contentSlug = photos.fields.slug;
  const contentImg = photos.fields.img;
  const contentImgUrl = photos.fields.img[0].fields.file.url;
  const contentDesc = photos.fields.desc;
  const contentDate = photos.fields.date;
  return (
    <main key={contentSlug}>
      <NextSeo
        title={`${contentTitle} - Jagad Yudha`}
        description={contentDesc}
        canonical={contentTitle}
        openGraph={{
          url: `https://jagad.xyz${contentSlug}`,
          title: `${contentTitle} - Jagad Yudha`,
          description: contentDesc,
          images: [
            {
              url: `https:${contentImgUrl}`,
              width: 1280,
              height: 720,
              alt: contentTitle,
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        {contentTitle}
      </h1>
      <div className='my-10'>
        <span className='bg-gray-600 text-center shadow-md text-white rounded-2xl text-sm p-2 font-sans font-normal mx-1'>
          {contentDate}
        </span>
      </div>
      <div className='pb-10 my-10'>
        <div className='grid grid-cols-1 gap-5'>
          {contentImg.map((item) => {
            const imgUrl = item.fields.file.url;
            const imgTitle = photos.fields.img[0].fields.title;
            return (
              <div key={item.fields.file.url}>
                <Image
                  width={500}
                  height={500}
                  layout='responsive'
                  src={`https:${imgUrl}`}
                  className='w-full'
                  alt={imgTitle}
                />
                <p className='text-center text-white text-md'>{imgTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default photosSlug;
