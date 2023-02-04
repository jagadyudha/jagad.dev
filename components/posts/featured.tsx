import React from 'react';
import Image from '@/components/image';
import Link from '@/components/customLink';
import ViewsCount from '@/components/views-count';

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
      <div className='group relative h-full rounded-none bg-opacity-75  duration-150 ease-in-out'>
        <div className='absolute h-full w-full rounded-none opacity-80 duration-150 ease-in-out group-hover:opacity-100'>
          <Image
            className='rounded-none'
            src={`/jagad.dev/posts/${slug}/header`}
            fill
            alt={title}
          />
        </div>
        <div className='relative z-10 flex h-full min-h-[300px] items-end rounded-none bg-background bg-opacity-30 p-4 md:min-h-full lg:py-0 xl:min-h-full xl:py-4'>
          <div>
            <h3>
              <div className='my-2'>
                <span className='mr-2 rounded-none bg-black bg-opacity-40 p-1 text-xs text-neutral-300'>
                  <ViewsCount slug={slug} />
                </span>
              </div>
              <span>{title}</span>
            </h3>

            <p className='text-sm text-gray-300'>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Featured;
