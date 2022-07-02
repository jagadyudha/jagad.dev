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

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      {/* Hero Section */}
      <div className='prose prose-invert max-w-none flex-none items-center space-x-0 text-white prose-a:no-underline md:my-24 xl:flex xl:space-x-4'>
        <div className='text-center xl:max-w-md xl:text-left'>
          <h1 className='text-3xl text-white sm:text-5xl'>
            {`Hey there! My name is`}{' '}
            <span className='text-primary'>Jagad Yudha Awali</span>
          </h1>
          <p className='text-md text-gray-400 sm:text-lg '>
            A Software Engineer who specializes in front-end for mobile and web
            applications. In addition, I publish programming-related blogs.
          </p>
          <div className='mt-10 space-x-2'>
            <Link href={'/posts'} passHref>
              <button className='md:text-md rounded-md bg-primary bg-opacity-75 py-3 px-3 text-sm font-bold duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4'>
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

        <div className='my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:my-0'>
          {posts.map((item) => {
            const { slug, content } = item;
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
  const posts = getContentIndex('posts');
  const featuredPost = await fetcher(
    `${process.env.SITE_URL}/api/featuredpost`
  );

  const filterFeaturedPost = posts.filter((item) =>
    featuredPost.includes(item.slug)
  );

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

export default Home;
