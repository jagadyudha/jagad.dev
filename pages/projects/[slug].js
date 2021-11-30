import Image from '@/components/image';
import { getContentful, getSlugContentful } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NextSeo } from 'next-seo';
import { getPlaiceholder } from 'plaiceholder';

export const getStaticPaths = async () => {
  const res = await getContentful('project');

  const paths = res.data.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const items = await getSlugContentful('project', params.slug);
  const { base64 } = await getPlaiceholder(
    `https:${items.data.items[0].fields.header.fields.file.url}`
  );

  return {
    props: {
      projects: items.data.items[0],
      plaiceholders: base64,
    },
    revalidate: 1,
  };
};

const ProjectsSlug = ({ projects, plaiceholders }) => {
  if (!projects) return <div>Loading...</div>;
  const contentTitle = projects.fields.title;
  const contentSlug = projects.fields.slug;
  const contentDesc = projects.fields.desc;
  const contentLabel = projects.fields.label;
  const contentImgUrl = `https:${projects.fields.header.fields.file.url}`;
  const contentImgWidth =
    projects.fields.header.fields.file.details.image.width;
  const contentImgHeight =
    projects.fields.header.fields.file.details.image.height;

  return (
    <div key={contentTitle}>
      <NextSeo
        title={`${contentTitle} - Jagad Yudha`}
        description={contentDesc}
        canonical={contentTitle}
        openGraph={{
          url: `https://jagad.xyz${contentSlug}`,
          title: `${contentTitle} - Jagad Yudha`,
          description: contentDesc,
          images: [
            {
              url: `${contentImgUrl}`,
              width: contentImgWidth,
              height: contentImgHeight,
              alt: contentTitle,
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        {contentTitle}
      </h1>
      <div className='my-10'>
        {contentLabel
          .slice(0)
          .reverse()
          .map((item) => (
            <span
              className='bg-white bg-opacity-10 text-center shadow-md text-white rounded-2xl text-sm p-2 font-sans font-normal mx-1'
              key={item}
            >
              {item}
            </span>
          ))}
      </div>
      <div className='rounded-lg relative object-cover overflow-hidden'>
        <Image
          width={contentImgWidth}
          height={contentImgHeight}
          layout='responsive'
          src={contentImgUrl}
          alt={contentTitle}
          placeholder='blur'
          blurDataURL={plaiceholders}
        ></Image>
      </div>
      <div>
        {documentToReactComponents(projects.fields.content, {
          renderMark: {
            [MARKS.CODE]: (children) => {
              return (
                <SyntaxHighlighter
                  lineProps={{
                    style: {
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap',
                      overflow: 'hidden',
                    },
                  }}
                  wrapLines={true}
                  language='javascript'
                  style={nord}
                  showLineNumbers
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            },
          },

          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) =>
              node.data.target.fields.file.contentType === 'video/mp4' ? (
                <div className='my-2 sm:my-5'>
                  <video controls>
                    <source src={'https:' + node.data.target.fields.file.url} />
                  </video>
                </div>
              ) : (
                <div className='my-2 sm:my-5 w-auto'>
                  <Image
                    width={node.data.target.fields.file.details.image.width}
                    height={node.data.target.fields.file.details.image.height}
                    src={'https:' + node.data.target.fields.file.url}
                    alt={node.data.target.fields.title}
                  ></Image>
                </div>
              ),
            [BLOCKS.HEADING_2]: (node, children) => (
              <h2 className='text-lg sm:text-2xl text-white font-bold mt-5 mb-2 sm:mt-10 sm:mb-5'>
                {children}
              </h2>
            ),
            [BLOCKS.PARAGRAPH]: (node, children) => (
              <div className='text-md sm:text-lg text-gray-300 my-2 sm:my-5'>
                {children}
              </div>
            ),
            [BLOCKS.LIST_ITEM]: (node) => (
              <li className='text-md sm:text-lg text-gray-300'>
                <ol>- {node.content[0].content[0].value}</ol>
              </li>
            ),
            [INLINES.HYPERLINK]: (node, children) => (
              <a
                href={node.data.uri}
                className='text-md sm:text-lg text-myorange my-2 sm:my-5 hover:underline'
              >
                {children}
              </a>
            ),
          },
        })}
      </div>
    </div>
  );
};

export default ProjectsSlug;
