import { getFeaturedPosts } from 'src/services/posts.service';

import HomeIndex from '@/components/pages/homes/index';

import { PostProps } from '@/libs/types';

export const revalidate = 3600;

const Index = async () => {
  const featuredPost = (await getFeaturedPosts()) as PostProps[];
  return <HomeIndex featuredPost={featuredPost} />;
};

export default Index;
