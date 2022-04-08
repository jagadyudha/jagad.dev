//default
import { InferGetStaticPropsType } from 'next';

//components
import Featured from '@/components/featured';
import Image from '@/components/image';

//lib
import { getContentful } from '@/lib/contentful';

export async function getStaticProps() {
  const projects = await getContentful('project');
  const featuredProject = projects.filter(
    (project) => project.fields.slug === 'citizenapp'
  );

  const posts = await getContentful('post');
  const featuredPost = posts.filter(
    (post) =>
      post.fields.slug === 'how-to-create-steam-player-summaries-with-next-js'
  );

  return {
    props: {
      featuredProject,
      featuredPost,
    },
    revalidate: 1,
  };
}

const Home = ({
  featuredPost,
  featuredProject,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className='mb-16 flex-none items-center justify-center md:flex'>
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
          <Featured data={featuredPost} category='Post' />
          <Featured data={featuredProject} category='Project' />
        </div>
      </div>
    </>
  );
};

export default Home;
