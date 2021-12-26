import { getContentful } from '../../lib/contentful';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../../lib/seo';
import DataSeo from '@/_data/seo.json';
import ProjectList from '@/components/projects/projectlist';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let tag = null;
  if (query?.slug && query.slug[0] === 'tags') {
    const res = await getContentful('project');
    tag = res.filter((element) =>
      element.fields.label.some(
        (item: string) => query?.slug && item === query.slug[1]
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
  return (
    <>
      <NextSeo
        title={'Projects - Jagad Yudha Awali'}
        description={`I've been creating projects since my college days in 2018. I have a lot of ideas about what I want to do in the future, and this is my project that I have completed in the past.`}
        canonical={`${DataSeo.url}/projects`}
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <ProjectList data={tag} />
    </>
  );
};

export default Tags;
