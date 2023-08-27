import React from 'react';

import PostCard from '@/components/pages/posts/card';

import { PostProps } from '@/libs/types';

const PostIndex = ({ posts }: { posts: PostProps[] }) => {
  return (
    <div className='prose prose-invert mx-auto mb-16 h-full max-w-4xl prose-a:no-underline sm:mb-32'>
      <div className='flex justify-center text-center md:mb-5'>
        <div className='max-w-xl'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>{`Posts`}</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`Collection of informative and resources focused on various programming-related with the latest industry trends.`}
          </p>
        </div>
      </div>
      <div className='max-2-xl mb-10 grid grid-cols-1 gap-y-6 md:gap-y-10 xl:my-0'>
        {posts
          .sort((a: any, b: any) => {
            return (
              new Date(b.frontmatter.date).valueOf() -
              new Date(a.frontmatter.date).valueOf()
            );
          })
          .map((post) => {
            const { slug } = post;
            const { title, description, date, tags, header } = post.frontmatter;
            return (
              <PostCard
                header={header}
                key={slug}
                slug={slug}
                title={title}
                description={description}
                date={date}
                tags={tags}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PostIndex;
