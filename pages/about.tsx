import Image from '@/components/image';

//seo
import { NextSeo } from 'next-seo';
import DataSeo from '@/_data/seo.json';

const About = () => {
  const title = 'About';
  const description = `My professional background, key accomplishments, personal values, and any brands I may be associated with.`;

  return (
    <>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={`My professional background, key accomplishments, personal values, and any brands I may be associated with`}
        canonical={`${DataSeo.url}/about`}
      />

      <main className='prose-md prose prose-invert max-w-none'>
        <div
          className='mb-16 text-center
        '
        >
          <h1 className='-my-1 text-3xl sm:text-5xl'>About Me</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            {`Here's my professional background, key accomplishments, and personal
            values.`}
          </p>
        </div>

        <div className='relative float-left mr-4 h-36 w-1/2  object-cover md:w-1/3 lg:h-64 lg:w-1/4'>
          <Image
            src={'/jagad.dev/me_p61sc3.png'}
            className='rounded-sm md:rounded-md'
            layout='fill'
            objectFit='cover'
            objectPosition={'50% 30%'}
            alt={'Jagad Yudha Awali'}
          />
        </div>

        <div>
          <p>
            {`Hello! I'm Jagad Yudha Awali. I was born and raised in Sidoarjo,
                Indonesia. I am currently working freelance as a front-end
                developer while studying at the `}
            <a
              className='font-medium text-primary underline'
              href='https://umsida.ac.id'
            >
              University of Muhammadiyah Sidoarjo.
            </a>
          </p>
          <p className='text-md mb-5 '>
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
          <p className='text-md -mt-1'>
            Learning new technologies is essential for me since, in the future,
            I think illiteracy will be defined as the inability to read
            programming languages.
          </p>
          <p className='text-md '>
            Aside from programming stuff, I enjoy playing simulation racing, —
            especially Formula 1, and began competing in the Indo Formula League
            and winning the{' '}
            <a href='https://youtu.be/jIm3e-iBWjc?t=3845'>France Grand Prix</a>.
          </p>
          <p>
            Read more about my activities related to programming on{' '}
            <a
              href='https://www.polywork.com/imyour_universe'
              target={'_blank'}
              rel='noreferrer noopener'
            >
              Polywork
            </a>
          </p>
        </div>

        <div className='mt-16 text-center'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>Skillset</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            My skillset is a mix of web and mobile development.
          </p>
        </div>

        <div className='my-10'></div>
        <div className=' grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {skills.map((item, index) => (
            <div
              className='-pt-5 rounded-lg border border-white border-opacity-10 bg-background_100 p-5'
              key={index}
            >
              <h2 className='mb-5 -mt-0.5 text-lg font-bold text-white sm:text-xl'>
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
      </main>
    </>
  );
};

const skills = [
  {
    name: 'Programming Languages',
    list: ['JavaScript', 'TypeScript', 'Python', 'Dart (Learning)'],
  },
  {
    name: 'Mobile Development',
    list: ['React Native', 'Flutter (Learning)'],
  },
  {
    name: 'Backend Development',
    list: ['Express', 'Next.js API', 'Flask', 'Supabase', 'Firebase', 'MySQL'],
  },
  {
    name: 'Web Development',
    list: ['HTML & CSS', 'Tailwind CSS', 'Bootstrap', 'React', 'Next.js'],
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
