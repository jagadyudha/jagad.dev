import React from 'react';
import Image from '@/components/image';
import Tags from '@/components/tags';

export interface postProps {
  slug: string;
  title: string;
  header: string;
  description: string;
  date: Date;
  tags: Array<string>;
  readtime: string;
}

const PostCard: React.FC<postProps> = (props) => {
  const { slug, title, description, date, tags, readtime, header } = props;

  return (
    <a
      href={`/posts/${slug}`}
      key={slug}
      className='group relative h-full rounded-2xl duration-500 ease-in-out hover:scale-105'
    >
      <div className='absolute h-full w-full rounded-2xl bg-gray-900 opacity-30 '>
        <Image
          className='rounded-2xl'
          src={header}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='relative z-10 p-4 duration-500 ease-in-out group-hover:-translate-y-3'>
        <div>
          <h3>{title} </h3>

          <p className='text-gray-300'>{description}</p>
        </div>
        <div>
          {tags
            .slice(0)
            .reverse()
            .map((tag) => (
              <Tags
                key={tag}
                name={tag}
                href={`/posts?tag=${tag.toLowerCase()}`}
              />
            ))}
        </div>
      </div>
    </a>
  );
};

export default PostCard;
