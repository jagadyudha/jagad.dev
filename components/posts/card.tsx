import React from 'react';
import Tags from '@/components/posts/tags';
import Link from '@/components/customLink';

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
  const { slug, title, description, date, tags } = props;
  const reservedTasks = tags.slice(0).reverse();

  return (
    <div className='relative flex items-center gap-x-10'>
      <hr className='hidden w-[30%] md:block' />
      <div className='w-full md:w-[70%]'>
        <Link href={`/posts/${slug}`} key={slug}>
          <h3 className='flex gap-x-4'>{title}</h3>
          <p className='text-gray-400 line-clamp-2'>{description}</p>
        </Link>
        {reservedTasks.map((tag, index) => (
          <Tags
            key={index}
            name={tag}
            href={`/posts?tag=${tag.toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
