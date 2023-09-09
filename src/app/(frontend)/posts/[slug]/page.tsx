import React from 'react';

import { Metadata } from 'next';

import { getPost, getPosts } from '@/services/posts.service';

import PostShow from '@/components/pages/posts/show';

import { dataOpenGraph } from '@/libs/data';
import { getOpenGraphImage } from '@/libs/helper';
import { PostProps } from '@/libs/types';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  let post = null;
  try {
    post = (await getPost(slug)) as PostProps;
    if (!post) throw Error;
  } catch (error) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      ...dataOpenGraph,
      title: post.frontmatter.title,
      url: '/posts/' + post.slug,
      images: [
        {
          url: getOpenGraphImage('posts', post.slug, post.frontmatter.title),
          width: 1280,
          height: 720,
          alt: 'Social',
          type: 'image/jpeg',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = (await getPosts()) as PostProps[];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const post = (await getPost(slug)) as PostProps;
  return <PostShow post={post} />;
};

export default Post;
