import React from 'react';

import { Metadata } from 'next';

import { getPosts } from '@/services/posts.service';

import PostIndex from '@/components/pages/posts/index';

import { PostProps } from '@/libs/types';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Posts',
  description: `Collection of informative and resources focused on various programming-related with the latest industry trends.`,
};

const Posts = async () => {
  const posts = (await getPosts()) as PostProps[];
  return <PostIndex posts={posts} />;
};

export default Posts;
