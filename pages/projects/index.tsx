//default
import { NextSeo } from 'next-seo';
import { InferGetStaticPropsType } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

import TechStack from '@/components/tech-stack';
//lib
import { cardTwitter } from '../../lib/seo';

//data
import DataSeo from '@/_data/seo.json';

export async function getStaticProps() {
  const files = fs.readdirSync('./contents/projects');
  const projects = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const readFile = fs.readFileSync(
      `./contents/projects/${fileName}`,
      'utf-8'
    );
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });
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
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;
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
      <div className='mx-auto my-5 md:my-10'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          {projects
            .sort((a, b) => {
              return (
                new Date(b.frontmatter.date).valueOf() -
                new Date(a.frontmatter.date).valueOf()
              );
            })
            .map((project) => {
              const { slug } = project;
              const { title, description, stack } = project.frontmatter;
              return (
                <div
                  key={slug}
                  className='flex items-center rounded-lg border border-gray-600 border-opacity-50 p-5'
                >
                  <Link href={`/projects/${slug}`}>
                    <a>
                      <h2 className='font-sans text-lg font-bold text-white sm:text-xl'>
                        {title}
                      </h2>
                      <p className='text-md my-2 font-sans font-normal text-gray-400'>
                        {description}
                      </p>

                      <div className='bottom-0 flex flex-wrap'>
                        {stack.slice(0).map((item: string) => (
                          <TechStack key={item} name={item} />
                        ))}
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default Projects;
