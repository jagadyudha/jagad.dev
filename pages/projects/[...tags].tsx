import { getContentful } from '../../lib/contentful';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { cardTwitter } from '../../lib/seo';
import DataSeo from '@/_data/seo.json';
import ProjectList from '@/components/project-list';
import Error from '@/pages/404';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let tag = null;
  if (query?.tags && query.tags[0] === 'tags') {
    const res = await getContentful('project');
    tag = res.filter((element) =>
      element.fields.label.some(
        (item: string) => query?.tags && item === query.tags[1]
      )
    );
  }

  return {
    props: {
      tag,
    },
  };
};

const Tags = ({
  tag,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!tag) return <Error />;
  return (
    <>
      <NextSeo
        title={'Projects - Jagad Yudha Awali'}
        description={`Since my first year of college in 2018, I've been working on projects. I have a lot of ideas for what I want to achieve in the future, and here is an example of a project I completed previously.`}
        canonical={`${DataSeo.url}/projects`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/projects`,
          title: `Project - Jagad Yudha Awali`,
          description: `Since my first year of college in 2018, I've been working on projects. I have a lot of ideas for what I want to achieve in the future, and here is an example of a project I completed previously.`,
          images: [
            {
              url: `${DataSeo.url}/projects`,
              width: 1280,
              height: 720,
              alt: `Project - Jagad Yudha Awali`,
              type: 'image/jpeg',
            },
          ],
          site_name: `Project - Jagad Yudha Awali`,
        }}
        twitter={cardTwitter}
      />
      <div className='mb-10 sm:mb-12'>
        <h1 className='font-sans text-3xl font-bold text-white sm:text-5xl'>
          {`Projects`}
        </h1>
        <p className='text-md my-5 font-sans font-normal text-gray-400 sm:text-lg'>
          {`I've been creating projects since my college days in 2018. I have a lot of ideas about what I want to do in the future, and this is my project that I have completed in the past.`}
        </p>
      </div>
      <ProjectList data={tag} />
    </>
  );
};

export default Tags;
