import React from 'react';
import Image from '@/components/image';
import { getMDXComponent } from 'mdx-bundler/client';
import { NextSeo } from 'next-seo';
import { ArticleJsonLd } from 'next-seo';
import readingTime from 'reading-time';
import { useSWRConfig } from 'swr';
import Link from '@/components/customLink';
import { useRouter } from 'next/router';

//lib
import { getContentPaths, getContentSlug } from '@/lib/fetcher';
import { cardTwitter } from '@/lib/seo';

//components
import ViewsCount from '@/components/views-count';
import Ads from '@/components/posts/adsense';
import Comment from '@/components/posts/comment';

//data
import DataSeo from '@/_data/seo.json';

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

export const getStaticPaths = async () => {
  const paths = getContentPaths('posts');

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
  //get from fetcher lib
  const { frontmatter, code, content } = await getContentSlug(
    params.slug,
    'posts' //<--- content --->
  );

  return {
    props: {
      frontmatter,
      content,
      code,
      slug: params.slug,
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

  const { title, description, date, header } = frontmatter;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;

  return (
    <main className='prose prose-base prose-invert mx-auto max-w-none'>
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

      <div className='text-center'>
        <div className='mx-auto  max-w-4xl'>
          <h1 className='text-white sm:text-5xl'>{title}</h1>
          <div className='my-10 text-gray-400'>
            <p className='text-xl'>
              {`Posted by Jagad Yudha Awali on ${new Date(date).toLocaleString(
                'default',
                {
                  month: 'long',
                }
              )} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}
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
              className='rounded-md'
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

      <div className='mx-auto max-w-3xl'>
        <Link
          href={`/posts/${
            slug.endsWith('-id') ? slug.replace('-id', '') : slug.concat('-id')
          }`}
        >
          <a>
            <button className='rounded-md border  border-primary px-3 py-2 text-sm font-medium text-primary'>
              Read in {!slug.endsWith('-id') ? 'Bahasa Indonesia' : 'English'}
            </button>
          </a>
        </Link>
      </div>

      <div className='mx-auto max-w-3xl '>
        <article>
          <Component components={{ Image, Ads, a: Link } as any} />
        </article>
        <hr className='my-8 opacity-20'></hr>
        <Comment />
      </div>
    </main>
  );
};

export default Posts;
