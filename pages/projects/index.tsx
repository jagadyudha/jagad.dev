//default
import { NextSeo } from 'next-seo';
import { InferGetStaticPropsType } from 'next';

//lib
import { cardTwitter } from '@/lib/seo';
import { getContentIndex } from '@/lib/fetcher';

//components
import TechStack from '@/components/tech-stack';
import ProjectCard from '@/components/projects/card';

//data
import DataSeo from '@/_data/seo.json';

export async function getStaticProps() {
  const projects = getContentIndex('projects');
  return {
    props: {
      projects,
    },
  };
}

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'Projects';
  const description = `Since my first year of college in 2018, I've been working on projects. I have a lot of ideas for what I want to achieve in the future, and here is an example of a project I completed previously.`;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;
  return (
    <main className='prose prose-invert mb-16 h-full max-w-none prose-a:no-underline sm:mb-32'>
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
      <div className='mb-10 flex justify-center text-center md:mb-16'>
        <div className='max-w-xl'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>{`Projects`}</h1>
          <p className='text-xl text-gray-400 sm:text-lg'>
            {`I've been creating projects since my college days in 2018. I have a lot of ideas about what I want to do in the future, and this is my project that I have completed in the past.`}
          </p>
        </div>
      </div>
      <div className='mx-auto my-5 md:my-10'>
        <div className='grid grid-cols-1 gap-5 md:gap-10'>
          {projects
            .sort((a, b) => {
              return (
                new Date(b.frontmatter.date).valueOf() -
                new Date(a.frontmatter.date).valueOf()
              );
            })
            .map((item) => {
              const { slug } = item;
              const { title, description, date, stack, header } =
                item.frontmatter;
              return (
                <ProjectCard
                  key={slug}
                  slug={slug}
                  title={title}
                  description={description}
                  header={header}
                  date={date}
                  stack={stack}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default Projects;
