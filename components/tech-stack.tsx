import React from 'react';

export interface TagsProps {
  name: string;
}

const TechStack: React.FC<TagsProps> = ({ name }) => {
  return (
    <div className=' mr-1 mt-2 flex items-center py-1 px-2 text-center font-sans text-xs font-normal text-white'>
      <div className='mx-auto mr-1.5 h-2 w-2 rounded-full bg-primary'></div>
      <span>{name}</span>
    </div>
  );
};

export default TechStack;
