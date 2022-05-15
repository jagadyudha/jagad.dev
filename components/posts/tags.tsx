import React from 'react';
import Link from 'next/link';

export interface TagsProps {
  name: string;
  href: string;
}

const Tags: React.FC<TagsProps> = ({ name, href }) => {
  return (
    <Link href={href} passHref>
      <button>
        <span className=' under mr-2 mt-2 rounded-md bg-white bg-opacity-40 py-1 px-2 text-center font-sans text-xs font-normal text-white'>
          #{name}
        </span>
      </button>
    </Link>
  );
};

export default Tags;
