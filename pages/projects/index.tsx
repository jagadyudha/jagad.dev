//default
import { NextSeo } from 'next-seo';
import { InferGetStaticPropsType } from 'next';

//lib
import { getContentIndex } from '@/lib/fetcher';

//components
import ProjectCard from '@/components/projects/card';

//data
import DataSeo from '@/_data/seo.json';

export type FrontmatterProps = {
  title: string;
  description: string;
  date: Date;
  stack: Array<string>;
  header: string;
};

export type Props = {
  frontmatter: FrontmatterProps;
  content: string;
  slug: {
    current: string;
  };
};

export async function getStaticProps() {
  const projects = await getContentIndex('projects');
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
  const description = `I've been creating projects since my college days in 2018. I love to create new things, and I can't wait to see what I create next.`;

  return (
    <main className='prose prose-invert mb-16 h-full max-w-none prose-a:no-underline sm:mb-32'>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/projects`}
      />
      <div className='mb-10 flex justify-center text-center md:mb-16'>
        <div className='max-w-xl'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>{`Projects`}</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`I've been creating projects since my college days in 2018. I love to create new things, and I can't wait to see what I create next.`}
          </p>
        </div>
      </div>
      <div className='mx-auto my-5 md:my-10'>
        <div className='grid grid-cols-1 gap-5 md:gap-10'>
          {projects
            .sort((a: any, b: any) => {
              return (
                new Date(b.frontmatter.date).valueOf() -
                new Date(a.frontmatter.date).valueOf()
              );
            })
            .map((item: Props) => {
              const { slug } = item;
              const { title, description, date, stack, header } =
                item.frontmatter;
              return (
                <ProjectCard
                  key={slug.current}
                  slug={slug.current}
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
