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

export async function generateStaticParams() {
  const posts = (await getPosts()) as PostProps[];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const post = (await getPost(slug)) as PostProps;

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

const Post = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const post = (await getPost(slug)) as PostProps;
  return <PostShow post={post} />;
};

export default Post;
