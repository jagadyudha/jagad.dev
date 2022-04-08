import React from 'react';
import Link from 'next/link';
import Tags from '@/components/tags';
import { IoSearch } from 'react-icons/io5';

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
}

const PostList: React.FC<Props> = ({ data }) => {
  //search state
  const [search, setSearch] = React.useState('');

  return (
    <>
      <div className='relative w-full'>
        <input
          type='text'
          className='form-input block w-full rounded-md border-0 bg-background_100 py-2 text-gray-300 placeholder-gray-300 focus:ring-white'
          placeholder='Search Posts...'
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch className='absolute right-4 top-[9px] text-xl text-gray-300' />
      </div>
      <div className='mx-auto my-5 md:my-10'>
        {data
          .filter((item) => {
            if (search === '') {
              return item;
            } else if (
              item.fields.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => {
            const contentTitle = item.fields.title;
            const contentSlug = `/posts/${item.fields.slug}`;
            const contentDesc = item.fields.desc;
            const contentLabel = item.fields.label;
            return (
              <div key={contentTitle} className='py-6'>
                <Link href={contentSlug}>
                  <a>
                    <h2 className='font-sans text-lg font-bold text-white sm:text-xl'>
                      {contentTitle}
                    </h2>
                    <p className='text-md my-2 font-sans font-normal text-gray-400'>
                      {contentDesc}
                    </p>

                    <div className='flex flex-wrap'>
                      {contentLabel
                        .slice(0)
                        .reverse()
                        .map((item: string) => (
                          <Tags
                            key={item}
                            href={`/posts/tags/${item}`}
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
    </>
  );
};

export default PostList;
