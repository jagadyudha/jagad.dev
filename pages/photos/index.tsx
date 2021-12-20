//lib
import { getContentful } from '../../lib/contentful';
import { cardOpenGraph, cardTwitter } from '@/lib/seo';
import { blurhash } from '@/lib/blurhash';
import Image from '@/components/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { InferGetStaticPropsType } from 'next';

//static
import DataSeo from '@/_data/seo.json';

export interface FieldsProps {
  img: Array<any>;
  title: string;
  slug: string;
  desc: string;
  publishDate: Date;
}

export interface Props {
  fields: FieldsProps;
}

export const getStaticProps = async () => {
  const items:Props[] = await getContentful('photo');
  const plaiceholders = await blurhash(items);

  return {
    props: {
      photos: items,
      plaiceholders,
    },
    revalidate: 1,
  };
};

const Photos = ({
  photos,
  plaiceholders,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title='Photos - Jagad Yudha Awali'
        description='photo that I have taken.'
        canonical={`${DataSeo.url}/photos`}
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />

      <div>
        <div className='sm:mb-20 mb-10'>
          <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
            {`Photos`}
          </h1>
          <p className='font-sans font-normal text-gray-300 my-5 sm:text-lg text-md'>
            {`honestly, I don't really like photography. Of course, I can't do this as well as a professional photographer. But, this is my personal website. So, I'm free to post my garbage photos.`}
          </p>
        </div>
        {photos.map((item, index) => {
          const contentTitle = item.fields.title;
          const contentSlug = `photos/${item.fields.slug}`;
          const contentImgUrl = `https:${item.fields.img[0].fields.file.url}`;
          const contentDesc = item.fields.desc;
          return (
            <div
              key={contentTitle}
              className='bg-mybg my-5 sm:my-10 rounded-md'
            >
              <Link href={contentSlug}>
                <a>
                  <div className='rounded-t-md relative object-cover overflow-hidden'>
                    <Image
                      placeholder='blur'
                      blurDataURL={plaiceholders[index]}
                      width={500}
                      height={500}
                      layout='responsive'
                      src={contentImgUrl}
                      alt={contentTitle}
                    />
                  </div>

                  <div className='py-5'>
                    <h2 className='font-sans font-bold text-white sm:text-lg text-md mx-5'>
                      {contentTitle}
                    </h2>
                    <p className='sm:text-lg text-md font-sans font-normal text-gray-300 mx-5 '>
                      {contentDesc}
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Photos;