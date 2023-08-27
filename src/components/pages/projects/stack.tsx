import React from 'react';

export interface TagsProps {
  name: string;
}

const Stack: React.FC<TagsProps> = ({ name }) => {
  return (
    <div className='mt-2 flex items-center py-1 text-center text-xs font-normal text-white'>
      <div className='mx-auto mr-1.5 h-2 w-2 rounded-full bg-primary'></div>
      <span>{name}</span>
    </div>
  );
};

export default Stack;
