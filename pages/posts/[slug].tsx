import React from 'react';
import Image from '@/components/image';
import { getMDXComponent } from 'mdx-bundler/client';
import { NextSeo } from 'next-seo';
import { ArticleJsonLd } from 'next-seo';
import readingTime from 'reading-time';
import { useSWRConfig } from 'swr';
import Link from '@/components/customLink';
import { useRouter } from 'next/router';
import Reactions from '@/components/posts/reaction';

//lib
import {
  getContentPaths,
  getContentSlug,
  getContentIndex,
} from '@/lib/fetcher';
import { cardTwitter } from '@/lib/seo';

//components
import ViewsCount from '@/components/views-count';
import Ads from '@/components/posts/adsense';
import Comment from '@/components/posts/comment';
import { Embed } from '@/components/embed';

//data
import DataSeo from '@/_data/seo.json';
import NewsLetter from '@/components/newsletter';

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
  isBahasa: boolean;
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
  //check if slug is id
  const posts = getContentIndex('posts');
  const checkTranslation = posts.filter(
    (item) =>
      item.slug ===
      `${
        params.slug.endsWith('id')
          ? params.slug.replace('-id', '')
          : params.slug
      }-id`
  );

  const isBahasa = checkTranslation.length > 0 ? true : false;
  let data;
  try {
    data = await getContentSlug(
      params.slug,
      'posts' //<--- content --->
    );
  } catch (e) {
    return {
      notFound: true,
    };
  }

  const { frontmatter, code, content } = data;

  return {
    props: {
      frontmatter,
      content,
      code,
      isBahasa,
      slug: params.slug,
    },
  };
};

const Posts = ({ frontmatter, content, slug, code, isBahasa }: Props) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const { title, description, date, header } = frontmatter;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;

  return (
    <main className='prose prose-base prose-invert mx-auto mb-16 max-w-none sm:mb-28'>
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

      <div className='flex-none xl:flex xl:space-x-8'>
        {/* Content */}
        <div className='mx-auto max-w-3xl'>
          <div className='text-center'>
            <h1 className='text-white sm:text-5xl'>{title}</h1>
            <div className='my-10 text-gray-400'>
              <p className='text-xl'>
                {`Posted on ${new Date(date).toLocaleString('default', {
                  month: 'long',
                })} ${new Date(date).getDate()}, ${new Date(
                  date
                ).getFullYear()}`}
              </p>
              <div className='text-md -mt-10 flex items-center justify-center gap-1'>
                <ViewsCount slug={`${enRouter}`} />•
                <p>{readingTime(content).text} </p>
              </div>
            </div>

            <div className='relative mx-auto h-56  md:h-72 xl:h-96'>
              <div className='absolute h-full w-full'>
                <Image
                  className='rounded-md'
                  src={header}
                  layout='fill'
                  objectFit='cover'
                  alt={title}
                />
              </div>
            </div>
            <p className='text-md mx-auto  text-left text-gray-400 sm:text-lg'>
              {description}
            </p>
          </div>

          <div className='mx-auto  text-left'>
            {isBahasa && (
              <div className='mx-auto '>
                <Link
                  href={`/posts/${
                    slug.endsWith('-id')
                      ? slug.replace('-id', '')
                      : slug.concat('-id')
                  }`}
                >
                  <button className='rounded-md border  border-primary px-3 py-2 text-sm font-medium text-primary'>
                    Read in{' '}
                    {!slug.endsWith('-id') ? 'Bahasa Indonesia' : 'English'}
                  </button>
                </Link>
              </div>
            )}
          </div>
          <article className='mx-auto '>
            <Component components={{ Image, Ads, a: Link, Embed } as any} />
          </article>
        </div>

        {/* Sidebar */}
        <div className='my-10 space-y-6 overflow-auto xl:sticky xl:top-10 xl:my-0 xl:w-80 xl:self-start'>
          <div>
            <span className='mb-4 flex justify-center'>Post Reactions</span>
            <Reactions slug={slug} />
          </div>
          <div>
            <span className='flex justify-center'>Ads</span>
            <Ads />
          </div>
        </div>
      </div>
      <hr className='my-8 opacity-20' />
      <Comment />
    </main>
  );
};

export default Posts;
