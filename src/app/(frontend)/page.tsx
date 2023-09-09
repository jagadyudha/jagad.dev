import { getFeaturedPosts } from 'src/services/posts.service';

import HomeIndex from '@/components/pages/homes/index';

import { PostProps } from '@/libs/types';
import { getAllTimeCode } from '@/libs/wakatime';

export const revalidate = 3600;

const Index = async () => {
  const allTimeCode = await getAllTimeCode();
  const featuredPost = (await getFeaturedPosts()) as PostProps[];
  if (!allTimeCode || !featuredPost) {
    return;
  }
  return <HomeIndex featuredPost={featuredPost} allTimeCode={allTimeCode} />;
};

export default Index;
