//default
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types';
import Image from '@/components/image';

import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

const RichText = ({ data }: any) => {
  return (
    <article id='article'>
      {documentToReactComponents(data.fields.content, {
        renderMark: {
          [MARKS.CODE]: (children) => {
            return (
              <div className='mb-10 mt-2 sm:mb-14'>
                <Highlight
                  {...defaultProps}
                  theme={theme}
                  code={String(children).trim()}
                  language='jsx'
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={`${className} overflow-x-auto rounded-md p-4 text-sm shadow-lg xl:overflow-x-hidden xl:whitespace-pre-wrap`}
                      style={style}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            );
          },

          [MARKS.ITALIC]: (children) => {
            return (
              <span className='whitespace-nowrap rounded-lg bg-white bg-opacity-20 p-0.5 text-xs text-white'>
                {children}
              </span>
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
              <div className='mb-5 sm:my-5 sm:mb-10 '>
                <div className='my-2 overflow-hidden rounded-lg shadow-lg'>
                  <Image
                    width={node.data.target.fields.file.details.image.width}
                    height={node.data.target.fields.file.details.image.height}
                    src={'https:' + node.data.target.fields.file.url}
                    alt={node.data.target.fields.title}
                    layout='responsive'
                  ></Image>
                </div>
                <p className='text-center italic text-gray-300'>
                  {node.data.target.fields.title}
                </p>
              </div>
            ),
          [BLOCKS.HEADING_2]: (node: any, children) => (
            <h2
              id={node.content[0].value.replace(/\s/g, '-').toLowerCase()}
              className='mt-5 mb-2 text-lg font-bold text-white sm:mt-10 sm:mb-5 sm:text-2xl'
            >
              {children}
            </h2>
          ),
          [BLOCKS.HEADING_6]: (node, children) => (
            <div className='text-md my-2 text-gray-300 sm:my-5'>{children}</div>
          ),
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className='text-md my-2 text-gray-300 sm:my-5'>{children}</p>
          ),
          [BLOCKS.LIST_ITEM]: (node: any) => (
            <li className='text-md text-gray-300 sm:text-lg'>
              <ol className='my-4'>- {node.content[0].content[0].value}</ol>
            </li>
          ),
          [INLINES.HYPERLINK]: (node, children) => (
            <a
              href={node.data.uri}
              className='text-md my-2 text-primary underline sm:my-5 sm:text-lg'
            >
              {children}
            </a>
          ),
          [BLOCKS.HR]: () => <hr className='mt-8 opacity-20'></hr>,
        },
      })}
    </article>
  );
};

export default RichText;
