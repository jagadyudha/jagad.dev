import React from 'react';

import { Metadata } from 'next';

import {
  getPost,
  getPosts,
  incrementPostViews,
} from '@/services/posts.service';

import PostShow from '@/components/pages/post';

import { dataOpenGraph } from '@/libs/data';
import { getOpenGraphImage } from '@/libs/helper';
import { PostProps } from '@/libs/types';

import useMdxBundler from '@/hooks/useMdxBundler';

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
    post = (await getPost({ slug })) as PostProps;
    if (!post) throw Error;
  } catch (error) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      ...dataOpenGraph,
      title: post.title,
      url: '/posts/' + post.slug,
      images: [
        {
          url: getOpenGraphImage('posts', post.slug, post.title),
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

  // register post views
  await incrementPostViews({ slug });
  const post = (await getPost({ slug })) as PostProps;
  const bundler = await useMdxBundler({ markdown: post.markdown });
  return <PostShow post={post} bundler={bundler} />;
};

export default Post;
