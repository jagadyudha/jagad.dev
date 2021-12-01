import Image from '@/components/image';
import { NextSeo } from 'next-seo';
import { getContentful, getSlugContentful } from '../../lib/contentful';
import { getPlaiceholder } from 'plaiceholder';
import { ProfileCard } from '@/components/profilecard';

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
  const plaiceholders = await Promise.all(
    items.data.items[0].fields.img.map(async (item) => {
      const { base64 } = await getPlaiceholder(`https:${item.fields.file.url}`);

      return base64;
    })
  ).then((values) => values);
  return {
    props: {
      photos: items.data.items[0],
      plaiceholders,
    },
    revalidate: 1,
  };
};

const PhotosSlug = ({ photos, plaiceholders }) => {
  if (!photos) return <div>Loading...</div>;
  const contentTitle = photos.fields.title;
  const contentSlug = photos.fields.slug;
  const contentImg = photos.fields.img;
  const contentImgUrl = photos.fields.img[0].fields.file.url;
  const contentDesc = photos.fields.desc;
  const contentDate = photos.fields.publishDate;
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
      <ProfileCard dates={contentDate} />
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        {contentTitle}
      </h1>

      <div className='pb-10 my-10'>
        <div className='grid grid-cols-1 gap-5'>
          {contentImg.map((item, index) => {
            const imgUrl = item.fields.file.url;
            const imgTitle = photos.fields.img[0].fields.title;
            return (
              <div key={item.fields.file.url}>
                <div className='rounded-lg relative object-cover overflow-hidden'>
                  <Image
                    blurDataURL={plaiceholders[index]}
                    placeholder='blur'
                    width={500}
                    height={500}
                    layout='responsive'
                    src={`https:${imgUrl}`}
                    alt={imgTitle}
                  />
                </div>
                <p className='text-center text-white text-md'>{imgTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default PhotosSlug;
