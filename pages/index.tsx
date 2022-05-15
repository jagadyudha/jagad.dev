//default
import { InferGetStaticPropsType } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import Link from 'next/link';

//components
import FeaturedPosts from '@/components/post-card';

export async function getStaticProps() {
  const files = fs.readdirSync('./contents/posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const fullPath = path.join(process.cwd(), './contents/posts/', fileName);
    const readFile = fs.readFileSync(fullPath, 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      frontmatter,
      content,
    };
  });

  var featuredPost = posts.filter((item) =>
    [
      'how-to-create-a-whatsapp-bot-with-node-js',
      'custom-image-transition-in-nextjs-with-tailwind-css',
      'how-to-create-steam-player-summaries-with-next-js',
      // 'react-native-camera-but-with-react-hooks',
    ].includes(item.slug)
  );

  return {
    props: {
      featuredPost,
    },
  };
}

const Home = ({
  featuredPost,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <main className='prose prose-invert h-full max-w-none flex-none items-center space-x-0 text-white prose-a:no-underline xl:flex-none xl:space-x-4'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-3xl text-white sm:text-5xl'>
            {`Hi there! My name is`}{' '}
            <span className='text-primary'>Jagad Yudha Awali</span>
          </h1>
          <p className='text-md text-gray-400 sm:text-xl '>
            A Software Engineer who specializes in front-end for mobile and web
            applications. In addition, I publish programming-related blogs.
          </p>
          <div className='mt-10 space-x-3'>
            <Link href={'/posts'} passHref>
              <button className='md:text-md rounded-md bg-primary bg-opacity-75 py-3 px-3 text-sm font-bold duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4'>
                Read the post
              </button>
            </Link>
            <Link href={'/about'} passHref>
              <button className='md:text-md rounded-md bg-[#393b3f] py-3 px-3 text-sm font-bold md:px-6 md:py-4'>
                About me
              </button>
            </Link>
          </div>
        </div>

        <div className='my-20 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3'>
          {featuredPost
            .sort((a, b) => {
              return (
                new Date(b.frontmatter.date).valueOf() -
                new Date(a.frontmatter.date).valueOf()
              );
            })
            .slice(0, 4)
            .map((featuredPost) => {
              const { slug, content } = featuredPost;
              const { title, description, date, tags, header } =
                featuredPost.frontmatter;
              return (
                <FeaturedPosts
                  key={slug}
                  slug={slug}
                  title={title}
                  description={description}
                  header={header}
                  date={date}
                  tags={tags}
                  readtime={readingTime(content).text}
                />
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
