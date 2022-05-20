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
    <Link href={`/projects/${slug}`}>
      <a className='group mb-5 max-w-none flex-none items-center justify-between xl:flex xl:flex-row-reverse'>
        <div className='max-w-lg overflow-hidden rounded-md bg-background_100 group-hover:bg-[#2C2D30] xl:ml-10'>
          <div className='-my-10 w-full translate-x-10 translate-y-10 shadow-2xl duration-100 ease-in-out group-hover:translate-y-6'>
            <Image
              className='rounded-sm'
              src={header}
              objectFit={'cover'}
              width={'1280'}
              height={'720'}
              alt={title}
            />
          </div>
        </div>

        <div className='max-w-lg'>
          <h3 className='group-hover:text-primary group-hover:underline'>
            {title}
          </h3>
          <p className='text-gray-400'>{description}</p>
          <div className='mb-8 flex flex-wrap'>
            {stack.slice(0).map((item: string, index) => (
              <TechStack key={index} name={item} />
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
