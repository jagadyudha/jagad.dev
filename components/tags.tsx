import React from 'react';
import Link from 'next/link';

export interface TagsProps {
  name: string;
  href: string;
}

const Tags: React.FC<TagsProps> = ({ name, href }) => {
  return (
    <Link href={href}>
      <a>
        <span className='z-10 mr-2 mt-2 rounded-2xl bg-white bg-opacity-20 py-1 px-2 text-center font-sans text-xs font-normal text-white'>
          #{name}
        </span>
      </a>
    </Link>
  );
};

export default Tags;
