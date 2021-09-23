import Image from 'next/image';
import { createClient } from 'contentful';
import Head from 'next/head';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_PROJECT,
    accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
  });

  const res = await client.getEntries({ content_type: 'project' });

  return {
    props: {
      projects: res.items,
    },
    revalidate: 1,
  };
}

export default function index({ projects }) {
  return (
    <main>
      <Head>
        <title>jagad yudha | projects</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <h1 className='font-sans font-bold dark:text-white text-black sm:text-5xl text-3xl'>
        Projects
      </h1>
      <div className='mx-auto my-10'>
        {projects.map((item) => (
          <div
            key={item.fields.title}
            className='dark:bg-mybg bg-mybglight shadow-md rounded-md my-10 sm:my-20'
          >
            <Image
              width={item.fields.header.fields.file.details.image.width}
              height={item.fields.header.fields.file.details.image.height}
              layout='responsive'
              className='rounded-t-md'
              src={'https:' + item.fields.header.fields.file.url}
              alt={item.fields.title}
            ></Image>
            <h1 className='font-sans font-bold dark:text-white text-black text-lg mx-5 my-5'>
              {item.fields.title}
            </h1>
            <p className='sm:text-lg text-md font-sans font-normal dark:text-gray-300 text-gray-700 mx-5 mb-2'>
              {item.fields.desc}
            </p>
            <div className='sm:flex justify-between flex-none py-5'>
              <div className='mx-5 mb-5 sm:my-auto'>
                {item.fields.label
                  .slice(0)
                  .reverse()
                  .map((item) => (
                    <span
                      className='bg-gray-600 text-center shadow-md text-white rounded-2xl text-sm p-2 font-sans font-normal mr-1'
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
              </div>

              <a href={'projects/' + item.fields.slug} className='mx-5 my-5'>
                <span className='font-sans font-semibold text-normal dark:text-myorange text-myorangelight mr-2 mb-5 hover:underline'>
                  Go to project ➔
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
