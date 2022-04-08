import React from 'react';
import Link from 'next/link';

export interface TagsProps {
  href: string;
  name: string;
}

const Tags: React.FC<TagsProps> = ({ href, name }) => {
  return (
    <Link href={href}>
      <a>
        <span className='mr-2 mt-2 rounded-2xl bg-white bg-opacity-10 py-1 px-2 text-center font-sans text-xs font-normal text-white transition-all duration-300 hover:scale-110'>
          {name}
        </span>
      </a>
    </Link>
  );
};

export default Tags;
