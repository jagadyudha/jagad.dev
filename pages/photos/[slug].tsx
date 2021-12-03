//lib
import { NextSeo } from 'next-seo';
import { getContentful, getSlugContentful } from '../../lib/contentful';
import { blurhashslug } from 'lib/blurhash';

//components
import ProfileCard from '@/components/profilecard';
import PhotoCard from '@/components/photocard';

export interface SlugFieldsProps {
  img: Array<any>;
  title: string;
  slug: string;
  desc: string;
  publishDate: Date;
}

export interface SlugProps {
  fields: SlugFieldsProps;
}

export interface SlugImageProps {
  fields: {
    file: {
      url: string;
    };
  };
}

export const getStaticPaths = async () => {
  const res = await getContentful('photo');
  const paths = res.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (params: { slug: string }) => {
  const items: SlugProps[] = await getSlugContentful('photo', params.slug);
  const plaiceholders = await blurhashslug(items);

  return {
    props: {
      photos: items[0],
      plaiceholders,
    },
    revalidate: 1,
  };
};

const PhotosSlug = ({
  photos,
  plaiceholders,
}: {
  photos: SlugProps;
  plaiceholders: Array<string>;
}) => {
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
      <PhotoCard
        title={contentTitle}
        image={contentImg}
        blurhash={plaiceholders}
      />
    </main>
  );
};

export default PhotosSlug;
