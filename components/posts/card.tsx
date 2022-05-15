import React from 'react';
import Image from '@/components/image';
import Tags from '@/components/posts/tags';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <a href={`/posts/${slug}`} key={slug} className='group'>
      <div className='relative mx-auto h-56 max-w-3xl md:h-72 xl:h-80'>
        <div className='absolute h-full w-full group-hover:opacity-70'>
          <Image
            className='rounded-md'
            src={header}
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>

      <div className='relative '>
        <p className='text-md'>
          {`Posted on ${new Date(date).toLocaleString('default', {
            month: 'long',
          })} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}
        </p>

        <h3>{title} </h3>

        <p className='text-gray-400'>{description}</p>

        <div>
          {tags
            .slice(0)
            .reverse()
            .map((tag, index) => (
              <Tags
                key={index}
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
