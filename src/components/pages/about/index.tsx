'use client';

import Image from '@/components/shared/image';

import { dataSkills } from '@/libs/data';

const AboutIndex = () => {
  return (
    <>
      <div className='prose-md prose prose-invert max-w-none'>
        <div className='mb-16 text-center'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>About Me</h1>
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
          <p>
            {`I'm Jagad Yudha, a wizard of app enchantment, specializing in front-end spells. With a wave of my coding wand, I conjure up mesmerizing web and app creations that sparkle with elegance and swiftness. My spells are intricately woven, crafting digital treasures that are both visually enchanting and powerfully functional.`}
          </p>
          <p>
            In my secret enchanted scrolls (
            <a href='https://jagad.dev'>jagad.dev</a>), I share my wisdom,
            unveiling the arcane secrets of technology with clarity and grace.
            Each word I scribe is like a magical incantation, unraveling the
            mysteries of the tech world for all to comprehend.
          </p>
          <p className='inline items-start'>
            {`With a heart attuned to the desires of my clients, I weave my spells
            to craft interfaces that dance with intuition. I'm the artist of
            user delight, ensuring that every interaction with my creations is a
            wondrous journey. I turn the ordinary into the extraordinary, one
            line of code at a time.`}
          </p>
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
