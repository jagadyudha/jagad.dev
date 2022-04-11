import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { NextSeo } from 'next-seo';
import { cardTwitter } from '../../lib/seo';
import DataSeo from '@/_data/seo.json';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { IoSearch } from 'react-icons/io5';
import readingTime from 'reading-time';
import PostCard from '@/components/post-card';

export async function getStaticProps() {
  const files = fs.readdirSync('./contents/posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const fullPath = path.join(process.cwd(), './contents/posts/', fileName);
    const readFile = fs.readFileSync(fullPath, 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      frontmatter,
      content,
    };
  });
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [post, setPost] = React.useState(posts);
  const [search, setSearch] = React.useState('');
  const router = useRouter();
  const { query } = router;

  React.useEffect(() => {
    const fetchByTags = async () => {
      const tag = post.filter((element) =>
        element.frontmatter.tags.some(
          (item: string) => query.tag == item.toLocaleLowerCase()
        )
      );
      setPost(tag);
    };

    if (query.tag) {
      fetchByTags();
    } else {
      setPost(posts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const title = 'Posts';
  const description = `Aside from coding, I occasionally write, but I still write about programming. because If I don't code in my life, something bad has happened to me.`;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;

  return (
    <main className='mb-16 sm:mb-28'>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/posts`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/posts`,
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
          {`Posts`}
        </h1>
        <p className='text-md my-5 font-sans font-normal text-gray-400 sm:text-lg'>
          {`Aside from coding, I occasionally write, but I still write about programming. because If I don't code in my life, something bad has happened to me.`}
        </p>
      </div>

      <div className='relative w-full'>
        <input
          type='text'
          className='form-input block w-full rounded-md border-0 bg-background_100 py-2 text-gray-300 placeholder-gray-300 focus:ring-white'
          placeholder='Search Posts...'
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch className='absolute right-4 top-[9px] text-xl text-gray-300' />
      </div>

      <div className='mx-auto my-5 md:my-10'>
        {post
          .sort((a: any, b: any) => {
            return (
              new Date(b.frontmatter.date).valueOf() -
              new Date(a.frontmatter.date).valueOf()
            );
          })
          .filter((item) => {
            if (search === '') {
              return item;
            } else if (
              item.frontmatter.title
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((post) => {
            const { slug, content } = post;
            const { title, description, date, tags } = post.frontmatter;
            return (
              <PostCard
                key={slug}
                slug={slug}
                title={title}
                description={description}
                date={date}
                tags={tags}
                readtime={readingTime(content).text}
              />
            );
          })}
      </div>
    </main>
  );
};

export default Posts;
