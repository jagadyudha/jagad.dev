import React from 'react';
import Image from '@/components/image';
import Link from 'next/link';
import TechStack from '@/components/projects/tech-stack';

export interface Props {
  title: string;
  description: string;
  header: string;
  date: Date;
  slug: string;
  stack: Array<string>;
}

const Card: React.FC<Props> = (props) => {
  const { title, description, header, stack, slug } = props;
  return (
    <div className='group prose prose-invert mb-10 max-w-none flex-none items-center justify-between xl:flex xl:flex-row-reverse'>
      <div className='max-w-lg overflow-hidden rounded-md bg-background_100 xl:ml-10'>
        <div className='-my-10 w-full translate-x-10 translate-y-10 shadow-2xl duration-100 ease-in-out hover:translate-y-7'>
          <Image
            className='rounded-sm'
            src={header}
            objectFit={'cover'}
            width={'1280'}
            height={'720'}
          />
        </div>
      </div>

      <div className='max-w-lg'>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className='mb-8 flex flex-wrap'>
          {stack.slice(0).map((item: string, index) => (
            <TechStack key={index} name={item} />
          ))}
        </div>
        <Link href={`/projects/${slug}`} passHref>
          <button className='md:text-md w-full rounded-md bg-white bg-opacity-100 px-5  py-3 text-sm font-medium text-black duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4 lg:w-2/4'>
            Detail Project
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
