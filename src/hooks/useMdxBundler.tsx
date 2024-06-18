import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

export default async function useMdxBundler({
  markdown,
}: {
  markdown: string;
}) {
  const result = await bundleMDX({
    source: markdown.trim(),
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

  return code;
}
