import React from 'react';
import Link from 'next/link';

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
    <div className='mx-auto my-10'>
      <div className='sm:mb-20 mb-10'>
        <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
          {`Projects`}
        </h1>
        <p className='font-sans font-normal text-gray-300 my-5 sm:text-lg text-md'>
          {`I've been creating projects since my college days in 2018. I have a lot of ideas about what I want to do in the future, and this is my project that I have completed in the past.`}
        </p>
      </div>
      {data.map((item) => {
        const contentTitle = item.fields.title;
        const contentSlug = `projects/${item.fields.slug}`;
        const contentDesc = item.fields.desc;
        const contentLabel = item.fields.label;
        return (
          <div key={contentTitle} className='-mx-4'>
            <Link href={contentSlug}>
              <a>
                <div className='transition duration-500 rounded-md hover:bg-mybg'>
                  <div className='py-4 mx-4'>
                    <h2 className='font-sans font-bold text-white sm:text-xl text-lg'>
                      {contentTitle}
                    </h2>
                    <p className='sm:text-lg text-md font-sans font-normal text-gray-300'>
                      {contentDesc}
                    </p>

                    <div className='sm:flex justify-between flex-none py-2'>
                      <div>
                        {contentLabel
                          .slice(0)
                          .reverse()
                          .map((item: string) => (
                            <Link key={item} href={`/projects/tags/${item}`}>
                              <span className='bg-white bg-opacity-10 text-center shadow-md text-white rounded-2xl text-sm py-1 px-2 font-sans font-normal mr-1'>
                                {item}
                              </span>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
