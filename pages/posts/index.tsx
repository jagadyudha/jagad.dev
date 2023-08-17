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

  // query hooks
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, languages]);

  const title = 'Posts';
  const description = `I have been writing online for over a year, and I've published close to ${englishPosts.length} articles on programming-related topics.`;

  return (
    <main className='prose prose-invert mx-auto mb-16 h-full max-w-4xl prose-a:no-underline sm:mb-32'>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/posts`}
      />
      <div className='flex justify-center text-center md:mb-5'>
        <div className='max-w-xl'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>{`Posts`}</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`Collection of informative and resources focused on various programming-related with the latest industry trends.`}
          </p>
        </div>
      </div>

      <div className='max-2-xl mb-10 grid grid-cols-1 gap-y-6 md:gap-y-10 xl:my-0'>
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
