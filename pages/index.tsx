//default
import { InferGetStaticPropsType } from 'next';
import readingTime from 'reading-time';
import Link from 'next/link';
import React from 'react';
//components
import FeaturedPost from '@/components/posts/featured';
import NewsLetter from '@/components/newsletter';

//lib
import { getContentIndex, fetcher } from '@/lib/fetcher';
import { Props } from './posts';

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      {/* Hero Section */}
      <div className='prose prose-invert my-8 max-w-none flex-none items-center space-x-0 text-white prose-a:no-underline sm:my-16 md:my-20 lg:flex lg:space-x-8 xl:my-24'>
        <div className='mx-auto max-w-4xl  text-center lg:max-w-md lg:text-left'>
          <h1 className='whitespace-pre-line text-3xl text-white xs:text-4xl sm:text-5xl'>
            {`Hey there! I'm\n`}{' '}
            <span className='text-primary'>Jagad Yudha</span>
          </h1>
          <p className='text-md mb-10 text-gray-400'>
            I am a software engineer who specializes in front-end development
            for web and mobile applications. I also love to write code and share
            my knowledge with others. 
          </p>
          <div className='mb-10 space-x-2 md:mb-20 lg:mb-0'>
            <Link href={'/posts'} passHref>
              <button className='md:text-md rounded-md bg-primary bg-opacity-75 py-3 px-3 text-sm font-bold shadow-md duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4'>
                Read the post
              </button>
            </Link>
            <Link href={'/about'} passHref>
              <button className='md:text-md rounded-md bg-[#393b3f] py-3 px-3 text-sm font-bold duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4 '>
                About me
              </button>
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:my-0'>
          {posts.map((item: Props) => {
            const { slug, content } = item;
            const { title, description, date, tags, header } = item.frontmatter;
            return (
              <FeaturedPost
                key={slug.current}
                slug={slug.current}
                title={title}
                description={description}
                header={header}
                date={date}
                tags={tags}
                readtime={readingTime(content).text}
              />
            );
          })}
        </div>
      </div>

      <NewsLetter />
    </main>
  );
};

export async function getStaticProps() {
  const posts = await getContentIndex('posts');
  const featuredPost = await fetcher(
    `${process.env.SITE_URL}/api/featuredpost`
  );

  const filterFeaturedPost = featuredPost.map((item: string) => {
    const post = posts.find((post: Props) => post.slug.current === item);
    return post;
  });

  return {
    props: {
      posts: filterFeaturedPost,
    },
  };
}

export default Home;
