import React from 'react';

import Tag from '@/components/pages/posts/tag';
import Link from '@/components/shared/customLink';
import { PostProps } from '@/libs/types';

const PostCard: React.FC<PostProps['frontmatter']> = (props) => {
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
          <Tag
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
