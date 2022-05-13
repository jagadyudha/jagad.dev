import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import Image from '@/components/image';
import Markdown from 'markdown-to-jsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
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
import Adsense from '@/components/adsense';

export interface frontmatter {
  title: string;
  description: string;
  date: Date;
  tags: Array<string>;
}

export interface slugProps {
  frontmatter: frontmatter;
  content: string;
  slug: string;
}

//components
import Tags from '@/components/tags';

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
  return {
    props: {
      frontmatter,
      content,
      slug: params.slug,
    },
  };
};

const Posts = ({ frontmatter, content, slug }: slugProps) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const enRouter = router.asPath.endsWith('-id')
    ? router.asPath.replace('-id', '')
    : router.asPath;

  React.useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function

    const registerView = () =>
      fetch(`/api/pageview/${enRouter}`, {
        method: 'POST',
      });
    registerView();

    //update data
    mutate(`/api/pageview/${enRouter}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, description, date, tags } = frontmatter;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;

  return (
    <>
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

      <div className='text-center' key={slug}>
        <div className='mt-5'>
          <h1 className='font-sans text-xl font-bold text-white sm:text-3xl'>
            {title}
          </h1>
          <p className='mb-10 mt-3 text-gray-300'>{description}</p>

          <div className='my-3 mb-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-sm font-normal text-gray-300 md:gap-5'>
            <div className='flex items-center gap-1'>
              <IoEyeOutline />
              <ViewsCount slug={`${enRouter}`} />
            </div>
            <div className='flex items-center gap-1'>
              <IoTimeOutline />
              <p>{readingTime(content).text} </p>
            </div>
            <div className='flex items-center gap-1'>
              <IoCalendarClearOutline />
              <p>
                {`${new Date(date).toLocaleString('default', {
                  month: 'long',
                })} ${new Date(date).getDate()}, ${new Date(
                  date
                ).getFullYear()}`}
              </p>
            </div>
            <div className='hidden items-center gap-1 xl:flex'>
              <IoLogoGithub />
              <a
                rel={'noreferrer noopener'}
                target={'_blank'}
                href={`https://github.com/jagadyudha/jagad.dev/edit/master/contents/posts/${slug}.mdx`}
              >
                <p>Edit on Github </p>
              </a>
            </div>
          </div>
        </div>

        <div className='my-5'>
          {tags
            .slice(0)
            .reverse()
            .map((item: string) => (
              <Tags
                key={item}
                href={`/posts?tag=${item.toLowerCase()}`}
                name={item}
              />
            ))}
        </div>
      </div>
      <div className='flex items-center'>
        <hr className='mr-4 flex-grow opacity-40'></hr>
        <Link
          href={`/posts/${
            slug.endsWith('-id') ? slug.replace('-id', '') : slug.concat('-id')
          }`}
        >
          <a>
            <button className='whitespace-nowrap rounded-md border border-primary px-2 py-1 text-sm font-medium text-primary'>
              Read in {!slug.endsWith('-id') ? 'Bahasa' : 'English'}
            </button>
          </a>
        </Link>
      </div>

      <article className='prose prose-base prose-invert mx-auto min-w-full'>
        <Markdown
          options={{
            overrides: {
              img: {
                component: Image,
              },
              ads: { component: Adsense },
            },
          }}
        >
          {content}
        </Markdown>
        <Adsense />
      </article>
      <hr className='my-8 opacity-20'></hr>
      <Comment />
    </>
  );
};

export default Posts;
