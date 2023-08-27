import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

import sanity from '@/libs/sanity';
import { ProjectRawProps } from '@/libs/types';

export const getProjects = async () => {
  const query = `*[_type == "projects"]`;
  const res: ProjectRawProps[] = await sanity.fetch(query);
  const data = res
    .filter((item) => !item.slug.current.endsWith('id'))
    .map((item) => {
      const { data: frontmatter, content } = matter(item.markdown);
      return {
        frontmatter,
        content,
        slug: item.slug.current,
      };
    });
  return data;
};

export const getProject = async (slug: string) => {
  const query = `*[_type == "projects" && slug.current == "${slug}"][0]`;
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
