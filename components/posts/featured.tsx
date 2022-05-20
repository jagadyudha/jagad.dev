import React from 'react';
import Image from '@/components/image';
import Link from 'next/link';

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
    <Link href={`/posts/${slug}`} key={slug}>
      <a className='group relative h-full rounded-md bg-opacity-75  duration-150 ease-in-out'>
        <div className='absolute h-full w-full rounded-md opacity-80 duration-150 ease-in-out group-hover:opacity-100'>
          <Image
            className='rounded-md'
            src={header}
            layout='fill'
            objectFit='cover'
            alt={title}
          />
        </div>
        <div className='relative z-10 flex h-full min-h-[300px] items-end rounded-md bg-opacity-40 bg-gradient-to-t from-background_100 to-transparent p-4 shadow-md md:min-h-full lg:min-h-[350px] xl:min-h-full'>
          <div>
            <h3>
              <span className='mr-2 rounded-md bg-black bg-opacity-20 p-1 text-sm text-primary'>
                {`${new Date(date).toLocaleString('default', {
                  month: 'short',
                })} ${new Date(date).getDate()}, ${new Date(
                  date
                ).getFullYear()}`}
              </span>
              {title}{' '}
            </h3>

            <p className='text-gray-300'>{description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Featured;
