'use client';

import React from 'react';

import { getMDXComponent } from 'mdx-bundler/client';

import customLink from '@/components/shared/customLink';
import Embed from '@/components/shared/embed';
import Image from '@/components/shared/image';

import { ProjectProps } from '@/libs/types';

export const ProjectShow = ({ project }: { project: ProjectProps }) => {
  const ArticleComponent = React.useMemo(
    () => getMDXComponent(project.code!),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [project.code!],
  );
  const { title, description } = project.frontmatter;

  return (
    <div className='prose prose-base prose-invert mx-auto mb-16 max-w-none sm:mb-28'>
      <div className='mx-auto text-center'>
        <div className='relative -mt-28 min-h-[105vh]'>
          <div className='absolute h-full w-full opacity-40'>
            <Image
              className='object-cover'
              src={`/jagad.dev/projects/${project.slug}/header`}
              fill
              alt={title}
            />
          </div>
          <div className='relative flex h-full min-h-[105vh] w-full items-center justify-center bg-gradient-to-t from-background to-transparent text-center'>
            <div className='mx-5 max-w-3xl'>
              <h1 className='text-3xl text-white sm:text-5xl'>{title}</h1>
              <p className='text-md mb-10 text-center text-gray-400 sm:text-lg lg:mb-0'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <article className='mx-auto max-w-3xl '>
        <ArticleComponent components={{ Image, a: customLink, Embed } as any} />
      </article>
    </div>
  );
};
