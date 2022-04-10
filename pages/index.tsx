//default
import { InferGetStaticPropsType } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';

//components
import PostCard from '@/components/post-card';
import Image from '@/components/image';

export async function getStaticProps() {
  const files = fs.readdirSync('./contents/posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const readFile = fs.readFileSync(`./contents/posts/${fileName}`, 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      frontmatter,
      content,
    };
  });
  const arr = [
    'react-native-camera-but-with-react-hooks',
    'how-to-create-steam-player-summaries-with-next-js',
  ];

  const featuredPost = posts.filter((post) => post.slug === arr[0] || arr[1]);
  return {
    props: {
      featuredPost,
    },
    revalidate: 1,
  };
}

const Home = ({
  featuredPost,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className='mb-16 flex-none items-center justify-center md:-mx-7 md:flex lg:-mx-8 xl:-mx-11'>
        <div className='mx-auto mr-5 hidden w-full overflow-hidden rounded-lg md:block xl:w-1/2'>
          <Image
            src={
              'https://res.cloudinary.com/dlpb6j88q/image/upload/e_grayscale/v1647569135/personal/intro_k7hisn.jpg'
            }
            width={'44%'}
            height={'100%'}
            layout='responsive'
            objectFit='cover'
            alt='Jagad Yudha Awali'
            blurDataURL='https://res.cloudinary.com/dlpb6j88q/image/upload/w_6,h_6,e_grayscale,q_1,f_auto/v1647569135/personal/intro_k7hisn.jpg'
          />
        </div>
        <div className='-mx-6 -mt-24 mb-10 block w-screen min-w-[140px] overflow-hidden md:hidden'>
          <Image
            src={
              'https://res.cloudinary.com/dlpb6j88q/image/upload/w_600,h_600,c_thumb,g_face,e_grayscale/personal/intro_k7hisn.jpg'
            }
            width={'100%'}
            height={'100%'}
            layout='responsive'
            objectFit='cover'
            alt='Jagad Yudha Awali'
            placeholder='blur'
            blurDataURL='https://res.cloudinary.com/dlpb6j88q/image/upload/w_6,h_6,c_thumb,g_face,e_grayscale,q_1,f_auto/personal/intro_k7hisn.jpg'
          />
        </div>
        <div>
          <h1 className='my-1 font-sans text-3xl font-bold text-primary sm:text-5xl'>
            Jagad Yudha Awali
          </h1>
          <p className='sm:text-md my-1 flex-1 font-sans text-lg text-white'>
            Software Engineer based in Indonesia, He/Him
          </p>
          <p className='sm:text-md my-5 flex-1 whitespace-pre-line font-sans text-gray-400'>
            A Software Engineer who specializes in front-end for mobile and web
            applications. In addition, I publish programming-related blogs.
          </p>
          <h2 className='mt-8 font-sans text-xs font-medium text-white'>
            <span className=' rounded-full border border-primary bg-opacity-60 p-1 px-2 text-primary'>
              {`Featured Post`.toUpperCase()}
            </span>
          </h2>
          {featuredPost
            .sort((a, b) => {
              return (
                new Date(b.frontmatter.date).valueOf() -
                new Date(a.frontmatter.date).valueOf()
              );
            })
            .map((featuredPost) => {
              const { slug, content } = featuredPost;
              const { title, description, date, tags } =
                featuredPost.frontmatter;
              return (
                <PostCard
                  key={slug}
                  slug={slug}
                  title={title}
                  description={description}
                  date={date}
                  tags={tags}
                  readtime={readingTime(content).text}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
