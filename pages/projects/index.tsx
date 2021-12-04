import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../../lib/seo';
import { getContentful } from '../../lib/contentful';
import DataSeo from '@/_data/seo.json';
import { InferGetStaticPropsType } from 'next';

export interface FieldsProps {
  title: string;
  slug: string;
  desc: string;
  content: any;
  label: Array<string>;
  header: HeaderProps;
  width: number;
  height: number;
  publishDate: Date;
}

export interface HeaderProps {
  fields: {
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface Props {
  fields: FieldsProps;
}

export async function getStaticProps() {
  const items = await getContentful('project');

  return {
    props: {
      projects: items,
    },
    revalidate: 1,
  };
}

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title={'Projects - Jagad Yudha Awali'}
        description={`I've been creating projects since my college days in 2018. I have a lot of ideas about what I want to do in the future, and this is my project that I have completed in the past.`}
        canonical={`${DataSeo.url}/projects`}
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />

      <div className='mx-auto my-10'>
        <div className='sm:mb-20 mb-10'>
          <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
            {`Projects`}
          </h1>
          <p className='font-sans font-normal text-gray-300 my-5 sm:text-lg text-md'>
            {`I've been creating projects since my college days in 2018. I have a lot of ideas about what I want to do in the future, and this is my project that I have completed in the past.`}
          </p>
        </div>
        {projects.map((item) => {
          const contentTitle = item.fields.title;
          const contentSlug = `projects/${item.fields.slug}`;
          const contentDesc = item.fields.desc;
          const contentLabel = item.fields.label;
          return (
            <div key={contentTitle} className='-mx-4'>
              <Link href={contentSlug}>
                <a>
                  <div className='transition duration-500 rounded-md hover:bg-mybg'>
                    <div className='py-4 mx-4'>
                      <h2 className='font-sans font-bold text-white sm:text-xl text-lg'>
                        {contentTitle}
                      </h2>
                      <p className='sm:text-lg text-md font-sans font-normal text-gray-300'>
                        {contentDesc}
                      </p>

                      <div className='sm:flex justify-between flex-none py-2'>
                        <div>
                          {contentLabel
                            .slice(0)
                            .reverse()
                            .map((item: string) => (
                              <span
                                className='bg-white bg-opacity-10 text-center shadow-md text-white rounded-2xl text-sm py-1 px-2 font-sans font-normal mr-1'
                                key={item}
                              >
                                {item}
                              </span>
                            ))}
                        </div>
                      </div>
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

export default Projects;
