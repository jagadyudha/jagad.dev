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
  };
}

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // filter languages
  const bahasaPosts = posts.filter((item) => item.slug.endsWith('-id'));
  const englishPosts = posts.filter((item) => !item.slug.endsWith('-id'));

  // set default to english
  const [languages, setLanguages] = React.useState('en');
  const [post, setPost] = React.useState(englishPosts);

  // search posts
  const [search, setSearch] = React.useState('');

  const router = useRouter();
  const { query } = router;

  React.useEffect(() => {
    const fetchByLang = async () => {
      if (languages === 'id') {
        setPost(bahasaPosts);
      } else {
        setPost(englishPosts);
      }
    };

    const fetchByTags = async () => {
      const tag = post.filter((element) =>
        element.frontmatter.tags.some(
          (item: string) => query.tag == item.toLocaleLowerCase()
        )
      );
      setPost(tag);
    };

    fetchByLang();

    if (query.tag) {
      fetchByTags();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, languages]);

  const title = 'Posts';
  const description = `Aside from coding, I occasionally write, but I still write about programming. because If I don't code in my life, something bad has happened to me.`;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;

  return (
    <main className='prose prose-invert mb-16 h-full max-w-none prose-a:no-underline sm:mb-32'>
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
      <div className='mb-16 flex justify-center text-center'>
        <div className='max-w-xl'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>{`Posts`}</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`Aside from coding, I occasionally write, but I still write about programming. because If I don't code in my life, something bad has happened to me.`}
          </p>
        </div>
      </div>

      {/* <div className='flex items-center'>
        <hr className='mr-4 flex-grow opacity-40'></hr>
        <button
          className='whitespace-nowrap rounded-md border border-primary px-2 py-1 text-sm font-medium text-primary'
          onClick={() => {
            if (languages === 'en') {
              setLanguages('id');
            } else {
              setLanguages('en');
            }
          }}
        >
          Read in {languages === 'en' ? 'Bahasa' : 'English'}
        </button>
      </div> */}

      <div className='max-2-xl my-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:my-0'>
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
                readtime={readingTime(content).text}
              />
            );
          })}
      </div>
    </main>
  );
};

export default Posts;
