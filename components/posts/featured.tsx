import React from 'react';
import Image from '@/components/image';
import Tags from '@/components/posts/tags';

export interface Props {
  slug: string;
  title: string;
  header: string;
  description: string;
  date: Date;
  tags: Array<string>;
  readtime: string;
}

const Featured: React.FC<Props> = (props) => {
  const { slug, title, description, date, tags, readtime, header } = props;

  return (
    <a
      href={`/posts/${slug}`}
      key={slug}
      className='group relative h-full rounded-md bg-opacity-75  duration-150 ease-in-out'
    >
      <div className='absolute h-full w-full rounded-md opacity-40 duration-150 ease-in-out group-hover:opacity-20'>
        <Image
          className='rounded-md'
          src={header}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='relative z-10 h-full rounded-md p-4'>
        <div>
          <h3>
            <span className='mr-2 rounded-md bg-black bg-opacity-20 p-1 text-sm text-primary'>
              {`${new Date(date).toLocaleString('default', {
                month: 'short',
              })} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}
            </span>
            {title}{' '}
          </h3>

          <p className='text-gray-400'>{description}</p>
        </div>
      </div>
    </a>
  );
};

export default Featured;
