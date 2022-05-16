import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export const getContentIndex = (dir: string) => {
  const files = fs.readdirSync(`./contents/${dir}`);
  const data = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const fullPath = path.join(process.cwd(), `./contents/${dir}`, fileName);
    const readFile = fs.readFileSync(fullPath, 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      frontmatter,
      content,
    };
  });

  return data;
};

export const getContentPaths = (dir: string) => {
  const files = fs.readdirSync(`./contents/${dir}`);
  const paths = files.map((fileName) => {
    return {
      params: { slug: fileName.replace('.mdx', '') },
    };
  });

  return paths;
};

export const getContentSlug = async (slug: string, dir: string) => {
  let readFile;
  try {
    const fullPath = path.join(process.cwd(), `./contents/${dir}/${slug}.mdx`);
    readFile = fs.readFileSync(fullPath, 'utf-8');
  } catch (e) {
    return {
      notFound: true,
    };
  }

  const { data: frontmatter, content } = matter(readFile);

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
