import React from 'react';

import ProjectCard from '@/components/pages/projects/card';

import { ProjectProps } from '@/libs/types';

const ProjectIndex = ({ projects }: { projects: ProjectProps[] }) => {
  return (
    <div className='prose prose-invert mb-16 h-full max-w-none prose-a:no-underline sm:mb-32'>
      <div className='mb-10 flex justify-center text-center md:mb-16'>
        <div className='max-w-xl'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>{`Projects`}</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`Collection of my past endeavors, each representing a unique expression of my creativity and problem-solving abilities.`}
          </p>
        </div>
      </div>
      <div className='mx-auto my-5 md:my-10'>
        <div className='max-2-xl my-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:my-0 xl:grid-cols-3'>
          {projects
            .sort((a: any, b: any) => {
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
    </div>
  );
};

export default ProjectIndex;
