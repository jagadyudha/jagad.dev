import React from 'react';

import TechStack from '@/components/projects/tech-stack';
import Link from '@/components/shared/customLink';
import Image from '@/components/shared/image';

export interface Props {
  title: string;
  description: string;
  header: string;
  date: Date;
  slug: string;
  stack: Array<string>;
}

const Card: React.FC<Props> = (props) => {
  const { title, stack, slug } = props;
  return (
    <div className='group h-72 overflow-hidden rounded-md border border-gray-700 bg-white bg-opacity-5 px-3 backdrop-blur-lg md:h-60 lg:h-[17rem]'>
      <Link href={`/projects/${slug}`} key={slug}>
        <div className='relative text-center'>
          <h3>{title}</h3>
          <div className='-mt-2 flex justify-center space-x-4'>
            {stack
              .slice(0)
              .reverse()
              .map((tag, index) => (
                <TechStack key={index} name={tag} />
              ))}
          </div>
          {/* <p className='text-gray-400 line-clamp-2'>{description}</p> */}
        </div>

        <div className=' relative top-0 h-full w-full duration-300 group-hover:-translate-y-5'>
          <Image
            className='!h-auto rounded-lg object-contain'
            src={`/jagad.dev/projects/${
              slug.endsWith('-id') ? slug.replace('-id', '') : slug
            }/header`}
            fill
            alt={title}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
