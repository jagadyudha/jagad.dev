import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

import sanity from '@/libs/sanity';
import supabase from '@/libs/supabase';
import { PostRawProps, PostProps } from '@/libs/types';

export const getPosts = async () => {
  const query = `*[_type == "posts"]`;
  const res = await sanity.fetch(query);
  const data = res
    .filter((item: PostRawProps) => !item.slug.current.endsWith('id'))
    .map((item: PostRawProps) => {
      const { data: frontmatter, content } = matter(item.markdown);
      return {
        frontmatter,
        content,
        slug: item.slug.current,
      };
    });
  return data;
};

export const getPost = async (slug: string) => {
  const query = `*[_type == "posts" && slug.current == "${slug}"][0]`;
  const res = await sanity.fetch(query);
  const { data: frontmatter, content } = matter(res.markdown);
  const result = await bundleMDX({
    source: content.trim(),
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypePrism,
      ];

      return options;
    },
  });
  const { code } = result;

  return { code, frontmatter, content, slug };
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

export const incrementPostViews = async (slug: string) => {
  await supabase.from('views').insert({ slug });
  await supabase.rpc('increment', {
    slug_: slug,
  });
  return { status: 'ok' };
};
