import Image from 'next/image';
import { createClient } from 'contentful';
import { NextSeo } from 'next-seo';

const client = createClient({
  space: process.env.CONTENTFULL_SPACE_PROJECT,
  accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
});

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: 'photo' });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'photo',
    'fields.slug': params.slug,
  });

  return {
    props: {
      photos: items[0],
    },
    revalidate: 1,
  };
}

export default function Photos({ photos }) {
  if (!photos) return <div>Loading...</div>;
  return (
    <main key={photos.fields.slug}>
      <NextSeo
        title={photos.fields.title}
        description={photos.fields.desc}
        canonical={photos.fields.title}
        openGraph={{
          url: 'https://jagadyudha.me/photos/' + photos.fields.slug,
          title: photos.fields.title,
          description: photos.fields.desc,
          images: [
            {
              url: 'https:' + photos.fields.img[0].fields.file.url,
              width: 1280,
              height: 720,
              alt: photos.fields.img[0].fields.title,
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <h1 className='font-sans font-bold dark:text-white text-black sm:text-5xl text-3xl'>
        {photos.fields.title}
      </h1>
      <div className='my-10'>
        <span className='bg-gray-600 text-center shadow-md text-white rounded-2xl text-sm p-2 font-sans font-normal mx-1'>
          {photos.fields.date}
        </span>
      </div>
      <div className='pb-10 my-10'>
        <div className='grid grid-cols-1 gap-5'>
          {photos.fields.img.map((item) => (
            <div key={item.fields.file.url}>
              <Image
                width={500}
                height={500}
                layout='responsive'
                src={'https:' + item.fields.file.url}
                className='w-full'
                alt={photos.fields.img[0].fields.title}
              />
              <p className='text-center dark:text-white text-black text-md'>
                {photos.fields.img[0].fields.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
