'use client';

import Image from '@/components/shared/image';

import { dataSkills } from '@/libs/data';

const AboutIndex = () => {
  return (
    <>
      <div className='prose-md prose prose-invert max-w-none'>
        <div className='mb-16 text-center'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>About Me</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`Here's my professional background, key accomplishments, and personal
            values.`}
          </p>
        </div>

        <div className='relative float-left mr-4 h-36 w-1/2  object-cover md:w-1/3 lg:h-64 lg:w-1/4'>
          <Image
            src={'https://avatars.githubusercontent.com/u/41937681?v=4'}
            className='rounded-lg object-cover'
            fill
            alt={'Jagad Yudha Awali'}
          />
        </div>
        <div>
          <p className='line-through'>
            {`Hi there! I'm Jagad Yudha Awali. I was born and raised in Sidoarjo,
                Indonesia. I am currently working at simpul technologies as a Frontend
                Engineer. I love building websites and apps that are easy to use, fast, and beautiful.`}
          </p>
          <p className='text-md line-through'>
            I&apos;ve been attracted by the world of information technology
            since I was in junior high school.{' '}
            <a
              className='font-medium text-primary underline'
              href='https://www.perl.org/'
            >
              Perl
            </a>{' '}
            and the{' '}
            <a
              className='font-medium text-primary underline'
              href='https://www.gnu.org/software/bash/'
            >
              Bash shell
            </a>{' '}
            were both new to me at the time. Since then, I&apos;ve primarily
            worked with{' '}
            <a
              className='font-medium text-primary underline'
              href='https://www.javascript.com/'
            >
              JavaScript
            </a>{' '}
            on React, React Native, TypeScript, and Next.Js.
          </p>
          <p className='text-md text-xl'>{`I'm nothing.`}</p>
        </div>

        <div className='mt-16 text-center'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>Skillset</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            My skillset is a mix of web and mobile development.
          </p>
        </div>

        <div className='my-10'></div>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {dataSkills.map((item, index) => (
            <div
              className='-pt-5 rounded-md border border-gray-700 bg-white bg-opacity-5 p-5 backdrop-blur-lg'
              key={index}
            >
              <h2 className='mb-4 -mt-0.5 text-lg font-bold text-white sm:text-xl'>
                {item.name}
              </h2>
              {item.list.map((item, index) => (
                <p className='text-md my-2 text-gray-300' key={index}>
                  · {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutIndex;
