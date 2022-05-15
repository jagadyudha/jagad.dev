import React, { Children } from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import Image from '@/components/image';

import { getMDXComponent } from 'mdx-bundler/client';
import { bundleMDX } from 'mdx-bundler';

// import { serialize } from 'next-mdx-remote/serialize';
// import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { NextSeo } from 'next-seo';
import { ArticleJsonLd } from 'next-seo';
import readingTime from 'reading-time';
import {
  IoTimeOutline,
  IoCalendarClearOutline,
  IoLogoGithub,
  IoEyeOutline,
} from 'react-icons/io5';
import ViewsCount from '@/components/views-count';
import { useSWRConfig } from 'swr';
import Link from 'next/link';
import path from 'path';
import { useRouter } from 'next/router';
import Ads from '@/components/adsense';

export interface frontmatter {
  title: string;
  description: string;
  date: Date;
  tags: Array<string>;
  header: string;
}

export interface Props {
  frontmatter: frontmatter;
  content: string;
  slug: string;
  code: string;
}

//lib
import { cardTwitter } from '@/lib/seo';

//data
import DataSeo from '@/_data/seo.json';
import Comment from '@/components/comment';

export const getStaticPaths = async () => {
  const files = fs.readdirSync('./contents/posts');
  const paths = files.map((fileName) => {
    return {
      params: { slug: fileName.replace('.mdx', '') },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  // const fileName = fs.readFileSync(
  //   `./contents/posts/${params.slug}.mdx`,
  //   'utf-8'
  // );
  let readFile;
  try {
    const fullPath = path.join(
      process.cwd(),
      `./contents/posts/${params.slug}.mdx`
    );

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

  return {
    props: {
      frontmatter,
      content,
      code,
      slug: params.slug,
      // source: mdxSource,
    },
  };
};

const Posts = ({ frontmatter, content, slug, code }: Props) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const enRouter = router.asPath.endsWith('-id')
    ? router.asPath.replace('-id', '')
    : router.asPath;

  React.useEffect(() => {
    const registerView = () =>
      fetch(`/api/pageview/${enRouter}`, {
        method: 'POST',
      });
    registerView();

    //update data
    mutate(`/api/pageview/${enRouter}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const { title, description, date, tags, header } = frontmatter;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;

  return (
    <main className='prose prose-base prose-invert mx-auto max-w-none '>
      {/* Next Seo */}
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/posts/${slug}`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/posts/${slug}`,
          title: `${title} — Jagad Yudha Awali`,
          description: description,
          images: [
            {
              url: ogimage,
              width: 1280,
              height: 720,
              alt: title,
              type: 'image/jpeg',
            },
          ],
          site_name: `${title} - Jagad Yudha Awali`,
        }}
        twitter={cardTwitter}
      />

      {/* JsonLd */}
      <ArticleJsonLd
        url={`${DataSeo.url}/posts/${slug}`}
        title={`${title} — Jagad Yudha Awali`}
        images={[ogimage]}
        datePublished={new Date(date).toISOString()}
        dateModified={new Date(date).toISOString()}
        authorName={['Jagad Yudha Awali']}
        publisherName='jagad.dev'
        publisherLogo='/assets/images/me.png'
        description={description}
      />

      <div className=' text-center' key={slug}>
        <div className='mx-auto  max-w-4xl'>
          <h1 className='text-white sm:text-5xl'>{title}</h1>
          <div className='my-10 text-gray-400'>
            <p className='text-xl'>
              {`Posted on ${new Date(date).toLocaleString('default', {
                month: 'long',
              })} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}
            </p>
            <div className='text-md -mt-10 flex items-center justify-center gap-1'>
              <ViewsCount slug={`${enRouter}`} />•
              <p>{readingTime(content).text} </p>
            </div>
          </div>
        </div>

        <div className='relative mx-auto h-56 max-w-3xl md:h-72 xl:h-96'>
          <div className='absolute h-full w-full'>
            <Image
              className='rounded-xl'
              src={header}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
        <p className='text-md mx-auto max-w-3xl text-left text-gray-400 sm:text-lg'>
          {description}
        </p>
      </div>

      <div className='mx-auto max-w-3xl '>
        <article>
          <Component components={{ Image, ads: Ads } as any} />
        </article>
        <hr className='my-8 opacity-20'></hr>
        <Comment />
      </div>
    </main>
  );
};

export default Posts;
