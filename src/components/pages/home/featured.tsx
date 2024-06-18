import React from 'react';

import Link from '@/components/shared/customLink';

import { PostProps } from '@/libs/types';

const Featured: React.FC<Omit<PostProps, 'markdown' | 'updatedAt' | 'id'>> = (
  props,
) => {
  const { slug, title, description, views } = props;
  return (
    <Link href={`/posts/${slug}`} key={slug}>
      <div className='group relative h-full rounded-lg border border-gray-700 bg-white bg-opacity-5 backdrop-blur-sm duration-150 ease-in-out'>
        <div className='flex flex-col items-end justify-start px-4'>
          <h3 className='mt-4'>
            <div className='mb-2'>
              <span className='mr-2 rounded-lg bg-primary bg-opacity-10 p-1 text-xs text-primary'>
                {views} views
              </span>
            </div>
            <span>{title}</span>
          </h3>
          <p className='text-sm text-gray-300'>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Featured;
