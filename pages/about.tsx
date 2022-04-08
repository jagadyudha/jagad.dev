import Twemoji from '@/components/Twemoji';

//seo
import { NextSeo } from 'next-seo';
import DataSeo from '@/_data/seo.json';
import { cardTwitter } from '@/lib/seo';

const About = () => {
  const title = 'About';
  const description = `My professional background, key accomplishments, personal values, and any brands I may be associated with.`;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}`;
  return (
    <>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={`My professional background, key accomplishments, personal values, and any brands I may be associated with`}
        canonical={`${DataSeo.url}/about`}
        openGraph={{
          url: `${DataSeo.url}/about`,
          title: `${title} — Jagad Yudha Awali`,
          description: description,
          images: [
            {
              url: ogimage,
              width: 1280,
              height: 720,
              alt: title,
              type: 'image/jpeg',
            },
          ],
          site_name: title,
        }}
        twitter={cardTwitter}
      />
      <h1 className='font-sans text-3xl font-bold text-white sm:text-5xl'>
        About Me
      </h1>
      <p className='text-md my-5 mb-10 font-sans font-normal text-gray-400 sm:text-lg'>
        Hi there! My name is Jagad Yudha Awali
      </p>
      <p className='text-md mb-5 text-gray-400'>
        I was born and raised in Sidoarjo, <Twemoji emoji='🇮🇩' /> Indonesia. I
        am currently working freelance as a front-end developer while studying
        at the{' '}
        <a
          className='font-medium text-primary underline'
          href='https://umsida.ac.id'
        >
          University of Muhammadiyah Sidoarjo.
        </a>
      </p>
      <p className='text-md mb-5 text-gray-400'>
        I&apos;ve been attracted by the world of information technology since I
        was in junior high school.{' '}
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
        were both new to me at the time. Since then, I&apos;ve primarily worked
        with{' '}
        <a
          className='font-medium text-primary underline'
          href='https://www.javascript.com/'
        >
          JavaScript
        </a>{' '}
        on React, React Native, TypeScript, and Next.Js.
      </p>
      <p className='text-md mb-5 text-gray-400'>
        Learning new technologies is essential for me since, in the future, I
        think illiteracy will be defined as the inability to read programming
        languages.
      </p>
      <p className='text-md text-gray-400'>
        Aside from programming stuff, I enjoy playing simulation racing, —
        especially Formula 1, and began competing in the Indo Formula League and
        winning the{' '}
        <a
          className='font-medium text-primary underline'
          href='https://youtu.be/jIm3e-iBWjc?t=3845'
        >
          France Grand Prix
        </a>
        .
      </p>
      <div className='my-10'></div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {skills.map((item, index) => (
          <div
            className='rounded-lg border border-white border-opacity-20 p-5'
            key={index}
          >
            <h3 className='mb-5 text-lg font-bold text-white sm:text-xl'>
              {item.name}
            </h3>
            {item.list.map((item, index) => (
              <p className='text-md my-2 text-gray-400' key={index}>
                · {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const skills = [
  {
    name: 'Programming Languages',
    list: ['JavaScript', 'TypeScript', 'Python', 'Dart (Learning)', 'C++'],
  },
  {
    name: 'Mobile Development',
    list: [
      'React Native',
      'Flutter (Learning)',
      'React Native Paper',
      'React Navigation',
      'Native Base',
    ],
  },
  {
    name: 'Backend Development',
    list: [
      'Express',
      'Next.js API',
      'Flask',
      'Supabase',
      'Firebase',
      'MongoDB',
      'MySQL',
    ],
  },
  {
    name: 'Web Development',
    list: ['HTML & CSS', 'Tailwind', 'Bootstrap', 'React', 'Next.js'],
  },
  {
    name: 'Tools',
    list: ['VSCode', 'Figma', 'Postman', 'Git', 'Jupyter Notebook'],
  },

  {
    name: 'Hosting',
    list: ['Vercel', 'Netlify'],
  },
];

export default About;
