import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../../lib/seo';
import { getContentful } from '../../lib/contentful';
import { getPlaiceholder } from 'plaiceholder';

export async function getStaticProps() {
  const res = await getContentful('project');
  const plaiceholders = await Promise.all(
    res.data.items.map(async (item) => {
      const { base64 } = await getPlaiceholder(
        `https:${item.fields.header.fields.file.url}`
      );

      return base64;
    })
  ).then((values) => values);

  return {
    props: {
      projects: res.data.items,
      plaiceholders,
    },
    revalidate: 1,
  };
}

const projects = ({ projects, plaiceholders }) => {
  return (
    <>
      <NextSeo
        title='Project - Jagad Yudha'
        description='project that I made so far'
        canonical='Jagad Yudha - Frontend Developer'
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        Projects
      </h1>
      <div className='mx-auto my-10'>
        {projects.map((item, index) => {
          const contentTitle = item.fields.title;
          const contentWidth =
            item.fields.header.fields.file.details.image.width;
          const contentHeight =
            item.fields.header.fields.file.details.image.height;
          const contentUrl = `https:${item.fields.header.fields.file.url}`;
          const contentSlug = `projects/${item.fields.slug}`;
          const contentDesc = item.fields.desc;
          const contentLabel = item.fields.label;
          return (
            <div
              key={contentTitle}
              className='bg-mybg shadow-xl pb-10 my-10 sm:my-20 rounded-md'
            >
              <Link href={contentSlug}>
                <a>
                  <Image
                    width={contentWidth}
                    height={contentHeight}
                    layout='responsive'
                    className='rounded-t-md'
                    src={contentUrl}
                    alt={contentTitle}
                    placeholder='blur'
                    blurDataURL={plaiceholders[index]}
                  ></Image>
                  <h1 className='font-sans font-bold text-white text-lg mx-5 my-5'>
                    {contentTitle}
                  </h1>
                  <p className='sm:text-lg text-md font-sans font-normal text-gray-300 mx-5 mb-2'>
                    {contentDesc}
                  </p>
                  <div className='sm:flex justify-between flex-none pt-5'>
                    <div className='mx-5 sm:my-auto'>
                      {contentLabel
                        .slice(0)
                        .reverse()
                        .map((item) => (
                          <span
                            className='bg-gray-600 text-center shadow-md text-white rounded-2xl text-sm p-2 font-sans font-normal mr-1'
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                    </div>
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

export default projects;
