import { NextSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../../lib/seo';
import { getContentful } from '../../lib/contentful';
import DataSeo from '@/_data/seo.json';
import { InferGetStaticPropsType } from 'next';
import ProjectList from '@/components/projects/projectlist';

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
      <ProjectList data={projects} />
    </>
  );
};

export default Projects;
