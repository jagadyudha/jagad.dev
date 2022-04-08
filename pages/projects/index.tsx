//default
import { NextSeo } from 'next-seo';
import { InferGetStaticPropsType } from 'next';

//lib
import { cardTwitter } from '../../lib/seo';
import { getContentful } from '../../lib/contentful';

//data
import DataSeo from '@/_data/seo.json';

//components
import ProjectList from '@/components/project-list';

export async function getStaticProps() {
  const projects = await getContentful('project');
  return {
    props: {
      projects,
    },
    revalidate: 1,
  };
}

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'Projects';
  const description = `Since my first year of college in 2018, I've been working on projects. I have a lot of ideas for what I want to achieve in the future, and here is an example of a project I completed previously.`;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}`;
  return (
    <main className='mb-16 sm:mb-28'>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/projects`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/projects`,
          title: `${title} — Jagad Yudha Awali`,
          description: description,
          images: [
            {
              url: ogimage,
              width: 1280,
              height: 720,
              alt: title,
              type: 'image/jpeg',
            },
          ],
          site_name: title,
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
      <ProjectList data={projects} />
    </main>
  );
};

export default Projects;
