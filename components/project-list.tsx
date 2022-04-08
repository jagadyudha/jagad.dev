import React from 'react';
import Link from 'next/link';
import Tags from '@/components/tags';

export interface FieldsProps {
  title: string;
  slug: string;
  desc: string;
  content: any;
  label: Array<string>;
  header: HeaderProps;
  width: number;
  height: number;
  publishDate: Date;
}

export interface HeaderProps {
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

export interface Props {
  data: {
    fields: FieldsProps;
  }[];
}

const ProjectList: React.FC<Props> = ({ data }) => {
  return (
    <div className='mx-auto my-5 md:my-10'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {data.map((item) => {
          const contentTitle = item.fields.title;
          const contentSlug = `/projects/${item.fields.slug}`;
          const contentDesc = item.fields.desc;
          const contentLabel = item.fields.label;
          return (
            <div
              key={contentTitle}
              className='flex items-center rounded-lg border border-gray-600 border-opacity-50 p-5'
            >
              <Link href={contentSlug}>
                <a>
                  <h2 className='font-sans text-lg font-bold text-white sm:text-xl'>
                    {contentTitle}
                  </h2>
                  <p className='text-md my-2 font-sans font-normal text-gray-400'>
                    {contentDesc}
                  </p>

                  <div className='bottom-0 flex flex-wrap'>
                    {contentLabel
                      .slice(0)
                      .reverse()
                      .map((item: string) => (
                        <Tags
                          key={item}
                          href={`/projects/tags/${item}`}
                          name={item}
                        />
                      ))}
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
