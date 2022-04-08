import React from 'react';
import Link from 'next/link';

export interface FieldsProps {
  title: string;
  slug: string;
  desc: string;
  content: any;
  label: Array<string>;
  width: number;
  height: number;
  publishDate: Date;
}

export interface Props {
  data: {
    fields: FieldsProps;
  }[];
  category: string;
}

const FeaturedPost: React.FC<Props> = ({ data, category }) => {
  return (
    <div className='mt-10'>
      <h2 className='my-5 font-sans text-xs font-medium text-white'>
        <span className=' rounded-full border border-primary bg-opacity-60 p-1 px-2 text-primary'>
          {`Featured ${category}`.toUpperCase()}
        </span>
      </h2>
      {data.map((item) => {
        const contentTitle = item.fields.title;
        const contentSlug = `/${category.toLowerCase() + 's'}/${
          item.fields.slug
        }`;
        const contentDesc = item.fields.desc;
        return (
          <div key={contentTitle} className='rounded-lg  border-opacity-50'>
            <Link href={contentSlug}>
              <a>
                <h2 className='font-sans text-lg font-bold text-white sm:text-xl'>
                  {contentTitle}
                </h2>
                <p className='text-md my-2 font-sans font-normal text-gray-400'>
                  {contentDesc}
                </p>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedPost;
