import React from 'react';
import Image from '@/components/image';

export interface Props {
  title: string;
  description: string;
  header: string;
  date: Date;
  stack: Array<string>;
}

const Card: React.FC<Props> = (props) => {
  const { title, description, header, date, stack } = props;
  return (
    <div className='prose prose-invert flex max-w-none items-center space-x-10'>
      <div className='max-w-md'>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className='md:text-md text- rounded-md bg-white bg-opacity-75 py-3 px-3 text-sm font-normal text-black duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4'>
          Detail Project
        </button>
      </div>
      <div className='rounded-md bg-background_100 p-5'>
        <Image src={header} objectFit={'cover'} width={'1280'} height={'780'} />
      </div>
    </div>
  );
};

export default Card;
