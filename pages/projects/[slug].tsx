//default
import { NextSeo } from 'next-seo';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

//components
import Image from '@/components/image';
import TechStack from '@/components/tech-stack';

//lib
import { cardTwitter } from '@/lib/seo';

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
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync('./contents/projects');
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
  const fileName = fs.readFileSync(
    `./contents/projects/${params.slug}.mdx`,
    'utf-8'
  );
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
      slug: params.slug,
    },
    revalidate: 1,
  };
};

const ProjectsSlug = ({ frontmatter, content, slug }: slugProps) => {
  const { title, description, date, stack, header } = frontmatter;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(title).replace(
    `'`,
    '%27'
  )}&description=${encodeURIComponent(description).replace(`'`, '%27')}`;

  return (
    <div className='mb-16 sm:mb-28'>
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
      <div
        key={title}
        className='rounded-lg border border-gray-600 border-opacity-50'
      >
        <Image
          src={header}
          height={720}
          width={1280}
          alt={title}
          className='rounded-t-md'
        />
        <div className=' p-8'>
          <h2 className='font-sans text-lg font-bold text-white sm:text-xl'>
            {title}
          </h2>
          <p className='text-md my-5 font-sans font-normal text-gray-400'>
            {description}
          </p>

          <div className='flex flex-wrap'>
            {stack.slice(0).map((item: string) => (
              <TechStack key={item} name={item} />
            ))}
          </div>
        </div>
      </div>
      <article className='prose prose-base prose-invert min-w-full'>
        <Markdown
          options={{
            overrides: {
              img: {
                component: Image,
              },
            },
          }}
        >
          {content}
        </Markdown>
      </article>
    </div>
  );
};

export default ProjectsSlug;
