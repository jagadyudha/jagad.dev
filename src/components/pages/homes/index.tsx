'use client';

import React from 'react';

import FeaturedPost from '@/components/pages/homes/featured';
import Link from '@/components/shared/customLink';

import { PostProps } from '@/libs/types';

export type Props = {
  featuredPost: PostProps[];
  allTimeCode: { data: { text: string } };
};

const HomeIndex = ({ featuredPost, allTimeCode }: Props) => {
  return (
    <main>
      {/* Hero Section */}
      <div className='prose prose-invert my-8 max-w-none flex-none items-center space-x-0 text-white prose-a:no-underline sm:my-16 md:my-20 lg:flex lg:space-x-8 xl:my-24'>
        <div className='mx-auto w-full text-center lg:w-3/4 lg:text-left'>
          <h1 className='whitespace-pre-line text-3xl text-white xs:text-4xl sm:text-5xl'>
            {`Hey there! I'm\n`}{' '}
            <span className='text-primary'>Jagad Yudha</span>
          </h1>
          <p className='text-md mb-10 text-gray-400'>
            I am a software engineer who specializes in front-end development
            for web and mobile applications. so far I have opened a text editor
            for{' '}
            <span className=' font-bold text-white'>
              {allTimeCode?.data?.text}
            </span>
            . I also love to write code and share my knowledge with others.
          </p>
          <div className='mb-10 space-x-2 md:mb-20 lg:mb-0'>
            <Link href={'/posts'} passHref>
              <button className='md:text-md rounded-lg bg-primary bg-opacity-75 py-3 px-3 text-sm font-medium text-white shadow-md duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4'>
                Read the post
              </button>
            </Link>
            <Link href={'/about'} passHref>
              <button className='md:text-md rounded-lg bg-[#393b3f] py-3 px-3 text-sm font-medium text-white duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4 '>
                About me
              </button>
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:my-0'>
          {featuredPost.map((item) => {
            const { slug } = item;
            const { title, description, date, tags, header } = item.frontmatter;
            return (
              <FeaturedPost
                key={slug}
                slug={slug}
                title={title}
                description={description}
                header={header}
                date={date}
                tags={tags}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomeIndex;
