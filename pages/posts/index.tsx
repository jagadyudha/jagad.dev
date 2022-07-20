import React from 'react';
import readingTime from 'reading-time';
import { NextSeo } from 'next-seo';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { IoSearch } from 'react-icons/io5';

//lib
import { getContentIndex, SanityProps } from '@/lib/fetcher';

//data
import DataSeo from '@/_data/seo.json';

//components
import PostCard from '@/components/posts/card';

export type FrontmatterProps = {
  title: string;
  description: string;
  date: Date;
  tags: Array<string>;
  header: string;
  contributors?: Array<string>;
};

export type Props = {
  frontmatter: FrontmatterProps;
  content: string;
  slug: {
    current: string;
  };
};

export async function getStaticProps() {
  const posts = await getContentIndex('posts');

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // filter languages
  const bahasaPosts = posts.filter((item: Props) =>
    item.slug.current.endsWith('-id')
  );
  const englishPosts = posts.filter(
    (item: Props) => !item.slug.current.endsWith('-id')
  );

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
      const tag = post.filter((element: Props) =>
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

    // const getLocalStorage = () => {
    //   const concat = post.map((item: Props) => {
    //     const data = localStorage.getItem(item.slug.current.replace('-id', ''));
    //     return { ...item, localstorage: JSON.parse(data as string) };
    //   });
    //   setPost(concat);
    // };
    // getLocalStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, languages]);

  const title = 'Posts';
  const description = `I have been writing online for over a year, and I've published close to ${englishPosts.length} articles on programming-related topics.`;

  return (
    <main className='prose prose-invert mb-16 h-full max-w-none prose-a:no-underline sm:mb-32'>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/posts`}
      />
      <div className='mb-16 flex justify-center text-center'>
        <div className='max-w-xl'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>{`Posts`}</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`I have been writing online for over a year, and I've published close to ${englishPosts.length} articles on programming-related topics.`}
          </p>
        </div>
      </div>

      <div className='my-10'>
        <div className='relative mb-4 w-full'>
          <input
            type='text'
            className='form-input block w-full rounded-md border-0 bg-background_100 py-2 text-gray-300 placeholder-gray-300 focus:ring-white'
            placeholder='Search Posts...'
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearch className='absolute right-4 top-[9px] text-xl text-gray-300' />
        </div>

        <button
          className='whitespace-nowrap rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary'
          onClick={() => {
            if (languages === 'en') {
              if (router.query.tag) {
                router.push(`/posts`);
              }
              setLanguages('id');
            } else {
              if (router.query.tag) {
                router.push(`/posts`);
              }
              setLanguages('en');
            }
          }}
        >
          Read in {languages === 'en' ? 'Bahasa' : 'English'}
        </button>
      </div>

      <div className='max-2-xl my-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:my-0'>
        {post
          .sort((a: any, b: any) => {
            return (
              new Date(b.frontmatter.date).valueOf() -
              new Date(a.frontmatter.date).valueOf()
            );
          })
          .filter((item: Props) => {
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
          .map((post: Props) => {
            const { slug, content } = post;
            const { title, description, date, tags, header } = post.frontmatter;
            return (
              <PostCard
                header={header}
                key={slug.current}
                slug={slug.current}
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
