//default
import { NextSeo } from 'next-seo';
import { ArticleJsonLd } from 'next-seo';
import readingTime from 'reading-time';
import React from 'react';

//pages
import Error from '@/pages/404';

//components
import Tags from '@/components/tags';
import RichText from '@/components/rich-text';
import Comment from '@/components/comment';

//lib
import { cardTwitter } from '@/lib/seo';
import { getContentful, getSlugContentful } from '@/lib/contentful';

//data
import DataSeo from '@/_data/seo.json';

//slug fields props
export interface SlugFieldsProps {
  title: string;
  slug: string;
  desc: string;
  content: any;
  label: Array<string>;
  width: number;
  height: number;
  publishDate: Date;
}

//slug fields props
export interface SlugProps {
  fields: SlugFieldsProps;
}

//getstaticpaths
export const getStaticPaths = async () => {
  const res = await getContentful('post');

  const paths = res.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

//getstaticprops
export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const items = await getSlugContentful('post', params.slug);
  return {
    props: {
      posts: items[0],
    },
    revalidate: 1,
  };
};

const PostsSlug = ({ posts }: { posts: SlugProps }) => {
  //state for document
  const [_document, set_document] = React.useState<string | undefined | null>(
    null
  );

  //get document by article
  React.useEffect(() => {
    set_document(document.getElementById('article')?.innerText);
  }, []);

  if (!posts) return <Error />;

  const contentTitle = posts.fields.title;
  const contentSlug = posts.fields.slug;
  const contentDesc = posts.fields.desc;
  const contentLabel = posts.fields.label;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(
    contentTitle
  )}&description=${encodeURIComponent(contentDesc)}`;
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(posts.fields.publishDate);
  const contentDate = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const stats = readingTime(_document ? _document : 'loading');

  return (
    <div className='mb-16 sm:mb-28'>
      {/* Next Seo */}
      <NextSeo
        title={`${contentTitle} — Jagad Yudha Awali`}
        description={contentDesc}
        canonical={`${DataSeo.url}/posts/${contentSlug}`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/posts/${contentSlug}`,
          title: `${contentTitle} — Jagad Yudha Awali`,
          description: contentDesc,
          images: [
            {
              url: ogimage,
              width: 1280,
              height: 720,
              alt: contentTitle,
              type: 'image/jpeg',
            },
          ],
          site_name: `${contentTitle} - Jagad Yudha Awali`,
        }}
        twitter={cardTwitter}
      />

      {/* JsonLd */}
      <ArticleJsonLd
        url={`${DataSeo.url}/posts/${contentSlug}`}
        title={`${contentTitle} — Jagad Yudha Awali`}
        images={[ogimage]}
        datePublished={date.toISOString()}
        dateModified={date.toISOString()}
        authorName={['Jagad Yudha Awali']}
        publisherName='jagad.dev'
        publisherLogo='/assets/images/me.png'
        description={contentDesc}
      />

      <div className='text-center' key={contentTitle}>
        <div className='mt-5'>
          <h1 className='font-sans text-xl font-bold text-white sm:text-3xl'>
            {contentTitle}
          </h1>
          <p className='mb-10 mt-3 text-gray-300'>{contentDesc}</p>

          <p className='my-3 font-sans text-sm font-normal text-gray-400'>
            {stats.text} - {contentDate}
          </p>
        </div>
        <div className='my-5'>
          {contentLabel
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
      <hr className='my-8 opacity-20'></hr>
      <RichText data={posts} />
      <hr className='my-8 opacity-20'></hr>
      <Comment />
    </div>
  );
};

export default PostsSlug;
