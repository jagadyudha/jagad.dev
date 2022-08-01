//default
import React from 'react';
import { NextSeo } from 'next-seo';
import { getMDXComponent } from 'mdx-bundler/client';

//components
import Image from '@/components/image';
import customLink from '@/components/customLink';
import GithubCard from '@/components/githubCard';
import { Embed } from '@/components/embed';

//lib
import { cardTwitter } from '@/lib/seo';
import { getContentPaths, getContentSlug } from '@/lib/fetcher';

//data
import DataSeo from '@/_data/seo.json';

export interface frontmatter {
  title: string;
  description: string;
  date: Date;
  stack: Array<string>;
  header: string;
}

export interface slugProps {
  frontmatter: frontmatter;
  content: string;
  slug: {
    current: string;
  };
  code: string;
}

export const getStaticPaths = async () => {
  const paths = await getContentPaths('projects');

  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  //get from fetcher lib
  let data;
  try {
    data = await getContentSlug(
      params.slug,
      'projects' //<--- content --->
    );
  } catch (e) {
    return {
      notFound: true,
    };
  }

  const { frontmatter, code } = data;

  return {
    props: {
      frontmatter,
      code,
      slug: {
        current: params.slug,
      },
    },
    revalidate: 1,
  };
};

const ProjectsSlug = ({ frontmatter, code, slug }: slugProps) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const { title, description, date } = frontmatter;
  const generalSlug = slug.current.endsWith('-id')
    ? slug.current.replace('-id', '')
    : slug.current;
  const ogimage = `https://res.cloudinary.com/dlpb6j88q/image/upload/w_1200,h_630,c_limit%2Cf_auto%2Cfl_progressive%2Cq_75/w_600,h_630,c_fill,b_auto:predominant_gradient:2,c_pad,l_jagad.dev:projects:${generalSlug}:header/fl_layer_apply,g_west,x_550/w_500,h_630,c_fit,co_rgb:ffffff,g_west,x_60,y_-40,l_text:arial_50_bold:${encodeURIComponent(
    title
  ).replace(`'`, '%27')}/jagad.dev/social.png`;

  return (
    <main className='prose prose-base prose-invert mx-auto mb-16 max-w-none sm:mb-28'>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/projects/${slug.current}`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/projects/${slug.current}`,
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
          site_name: title,
        }}
        twitter={cardTwitter}
      />
      <div className='mx-auto max-w-4xl text-center'>
        <h1 className='text-white sm:text-5xl'>{title}</h1>

        <p className='my-14 text-xl'>
          {`Launched on ${new Date(date).toLocaleString('default', {
            month: 'long',
          })} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}
        </p>

        <div className='mx-auto h-full w-full max-w-3xl'>
          <Image
            className='rounded-md'
            src={`/jagad.dev/projects/${slug.current}/header`}
            width={'1280'}
            height={'773.04'}
            objectFit='cover'
            alt={title}
          />
        </div>
      </div>
      <hr className='mx-auto max-w-3xl' />
      <article className='mx-auto max-w-3xl '>
        <Component
          components={{ Image, a: customLink, GithubCard, Embed } as any}
        />
      </article>
    </main>
  );
};

export default ProjectsSlug;
