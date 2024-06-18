import supabase from '@/libs/supabase';
import { PostProps } from '@/libs/types';

export const getPosts = async () => {
  try {
    const { data } = await supabase
      .from('post')
      .select('*')
      .order('id', { ascending: false });
    if (!data) {
      throw Error('Failed get posts');
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async ({ slug }: Pick<PostProps, 'slug'>) => {
  try {
    const { data } = await supabase
      .from('post')
      .select('*')
      .eq('slug', slug)
      .single();
    if (!data) {
      throw Error('Failed get post');
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedPosts = async () => {
  try {
    const posts = await getPosts();
    const { data } = await supabase
      .from('views')
      .select('slug')
      .order('count', { ascending: false })
      .limit(4);
    const modifiers = data?.map((item) => {
      return item.slug;
    });
    if (!posts) {
      throw Error('Failed get posts');
    }
    if (!data) {
      throw Error('Failed get featured');
    }
    const filterFeaturedPost = modifiers?.map((item: string) => {
      const post = posts.find((post: PostProps) => post.slug === item);
      return post;
    });
    return filterFeaturedPost;
  } catch (error) {
    console.log(error);
  }
};

export const getPostViews = async (slug: string) => {
  const { data } = await supabase
    .from('views')
    .select('*')
    .eq('slug', slug)
    .single();

  return data;
};

export const incrementPostViews = async ({ slug }: { slug: string }) => {
  await supabase.rpc('incrementPostViews', {
    slug_: slug,
  });
  return { status: 'ok' };
};
