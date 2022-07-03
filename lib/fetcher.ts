import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { createClient } from 'next-sanity';

export type SanityProps = {
  markdown: string;
  slug: string;
};

const client = createClient({
  projectId: 'p9bgom2n',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false,
});

// general fetch
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// content index
export const getContentIndex = async (content: string) => {
  const res = await client.fetch(`*[_type == "${content}"]`);
  const data = res.map((item: SanityProps) => {
    const { data: frontmatter, content } = matter(item.markdown);
    return {
      frontmatter,
      content,
      slug: item.slug,
    };
  });

  return data;
};

// get content paths
export const getContentPaths = async (content: string) => {
  const res = await client.fetch(`*[_type == "${content}"]`);
  const contentPaths = res.map((item: any) => {
    return {
      params: {
        slug: item.slug.current,
      },
    };
  });

  return contentPaths;
};

// get content by slug
export const getContentSlug = async (slug: string, contents: string) => {
  const data = await client.fetch(
    `*[_type == "${contents}" && slug.current == "${slug}"][0]`
  );

  const { data: frontmatter, content } = matter(data.markdown);

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

  return { code, frontmatter, content };
};
