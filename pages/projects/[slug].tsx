//default
import React from 'react';
import { NextSeo } from 'next-seo';
import { getMDXComponent } from 'mdx-bundler/client';

//components
import Image from '@/components/image';
import customLink from '@/components/customLink';

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
  slug: string;
  code: string;
}

export const getStaticPaths = async () => {
  const paths = getContentPaths('projects');

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

  const { frontmatter, code, content } = data;

  return {
    props: {
      frontmatter,
      content,
      code,
      slug: params.slug,
    },
  };
};

const ProjectsSlug = ({ frontmatter, content, code, slug }: slugProps) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const { title, description, date, stack, header } = frontmatter;

  const ogimage = `https://res.cloudinary.com/dlpb6j88q/image/upload/w_1200,h_630,c_limit%2Cf_auto%2Cfl_progressive%2Cq_75/w_600,h_630,c_fill,b_auto:predominant_gradient:2,c_pad,l_jagad.dev:projects:${slug}:header/fl_layer_apply,g_east/w_192,h_630,c_fill,l_jagad.dev:hr/fl_layer_apply,g_west,x_485/w_500,h_630,c_fit,co_rgb:ffffff,g_west,x_60,y_-40,l_text:arial_50_bold:${encodeURIComponent(
    title
  ).replace(`'`, '%27')}/jagad.dev/social.png`;

  return (
    <main className='prose prose-base prose-invert mx-auto mb-16 max-w-none sm:mb-28'>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/projects/${slug}`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/projects/${slug}`,
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

        <div className='relative mx-auto h-56 max-w-3xl md:h-72 xl:h-96'>
          <div className='absolute h-full w-full'>
            <Image
              className='rounded-md'
              src={`/jagad.dev/projects/${slug}/header`}
              layout='fill'
              objectFit='cover'
              alt={title}
            />
          </div>
        </div>

        <p className='text-md mx-auto max-w-3xl text-left text-gray-400 sm:text-lg'>
          {description}
        </p>
      </div>
      <hr className='mx-auto max-w-3xl' />
      <article className='mx-auto max-w-3xl '>
        <Component components={{ Image, a: customLink } as any} />
      </article>
    </main>
  );
};

export default ProjectsSlug;
