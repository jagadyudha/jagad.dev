import { NextSeo } from 'next-seo';
import { cardTwitter } from '../../lib/seo';
import { getContentful } from '../../lib/contentful';
import DataSeo from '@/_data/seo.json';
import { InferGetStaticPropsType } from 'next';
import PostCard from '@/components/post-list';
import { useRouter } from 'next/router';
import React from 'react';

export async function getStaticProps() {
  const items = await getContentful('post');

  return {
    props: {
      posts: items,
    },
    revalidate: 1,
  };
}

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [post, setPost] = React.useState(posts);

  const router = useRouter();
  const { query } = router;

  React.useEffect(() => {
    const fetchByTags = async () => {
      const tag = post.filter((element) =>
        element.fields.label.some(
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
      <PostCard data={post} />
    </main>
  );
};

export default Posts;
