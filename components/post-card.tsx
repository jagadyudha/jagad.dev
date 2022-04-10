import React from 'react';
import Link from 'next/link';
import { IoTimeOutline } from 'react-icons/io5';
import Tags from '@/components/tags';

export interface postProps {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: Array<string>;
  readtime: string;
}

const PostCard: React.FC<postProps> = (props) => {
  const { slug, title, description, date, tags, readtime } = props;

  return (
    <div key={slug} className='py-4'>
      <Link href={`/posts/${slug}`}>
        <a>
          <h2 className='font-sans text-lg font-bold text-white sm:text-xl'>
            {title}
          </h2>
          <div className='my-3 flex items-center gap-3 font-sans text-sm font-normal text-gray-300'>
            <div className='flex items-center gap-1'>
              <IoTimeOutline />
              <p>{readtime}</p>
            </div>
            <div className='flex items-center gap-1'>
              <IoTimeOutline />
              <p>
                {`${new Date(date).toLocaleString('default', {
                  month: 'long',
                })} ${new Date(date).getDate()}, ${new Date(
                  date
                ).getFullYear()}`}
              </p>
            </div>
          </div>
          <p className='text-md my-2 font-sans font-normal text-gray-400'>
            {description}
          </p>
        </a>
      </Link>

      <div className='flex flex-wrap'>
        {tags
          .slice(0)
          .reverse()
          .map((item: string) => (
            <Tags
              key={item}
              href={`/posts?tag=${item.toLowerCase()}`}
              name={item}
            />
          ))}
      </div>
    </div>
  );
};

export default PostCard;
