//default
import { NextSeo } from 'next-seo';

//pages
import Error from '@/pages/404';

//components
import Image from '@/components/image';
import TechStack from '@/components/tech-stack';
import RichText from '@/components/rich-text';

//lib
import { cardTwitter } from '@/lib/seo';
import { blurhashprojects } from '@/lib/blurhash';
import { getContentful, getSlugContentful } from '@/lib/contentful';

//data
import DataSeo from '@/_data/seo.json';

export interface SlugFieldsProps {
  title: string;
  slug: string;
  desc: string;
  content: any;
  label: Array<string>;
  header: SlugHeaderProps;
  width: number;
  height: number;
  publishDate: Date;
}

export interface SlugHeaderProps {
  fields: {
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface SlugProps {
  fields: SlugFieldsProps;
}

export const getStaticPaths = async () => {
  const res = await getContentful('project');

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

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const items = await getSlugContentful('project', params.slug);

  return {
    props: {
      projects: items[0],
    },
    revalidate: 1,
  };
};

const ProjectsSlug = ({ projects }: { projects: SlugProps }) => {
  if (!projects) return <Error />;

  const contentTitle = projects.fields.title;
  const contentSlug = projects.fields.slug;
  const contentDesc = projects.fields.desc;
  const contentLabel = projects.fields.label;
  const contentImgUrl = `https:${projects.fields.header.fields.file.url}`;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(
    contentTitle
  ).replace(`'`, '%27')}&description=${encodeURIComponent(contentDesc).replace(
    `'`,
    '%27'
  )}`;

  return (
    <div className='mb-16 sm:mb-28'>
      <NextSeo
        title={`${contentTitle} — Jagad Yudha Awali`}
        description={contentDesc}
        canonical={`${DataSeo.url}/projects/${contentSlug}`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/projects/${contentSlug}`,
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
          site_name: contentTitle,
        }}
        twitter={cardTwitter}
      />
      <div
        key={contentTitle}
        className='rounded-lg border border-gray-600 border-opacity-50'
      >
        <div className='overflow-hidden rounded-t-lg'>
          <Image
            src={`${contentImgUrl}`}
            height={720}
            width={1280}
            alt={contentTitle}
            priority
          />
        </div>
        <div className=' p-8'>
          <h2 className='font-sans text-lg font-bold text-white sm:text-xl'>
            {contentTitle}
          </h2>
          <p className='text-md my-5 font-sans font-normal text-gray-400'>
            {contentDesc}
          </p>

          <div className='flex flex-wrap'>
            {contentLabel.slice(0).map((item: string) => (
              <TechStack key={item} name={item} />
            ))}
          </div>
        </div>
      </div>
      <RichText data={projects} />
    </div>
  );
};

export default ProjectsSlug;
