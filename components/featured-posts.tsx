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
      className='group relative h-full rounded-md bg-opacity-75  duration-150 ease-in-out hover:scale-95 '
    >
      <div className='absolute h-full w-full rounded-md opacity-40'>
        <Image
          className='rounded-md'
          src={header}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='relative z-10 h-full rounded-md bg-black bg-opacity-20 p-4'>
        <div>
          <h3>{title} </h3>

          <p className='text-gray-400'>{description}</p>
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
