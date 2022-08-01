import React from 'react';
import Image from '@/components/image';
import { getMDXComponent } from 'mdx-bundler/client';
import { NextSeo } from 'next-seo';
import { ArticleJsonLd } from 'next-seo';
import readingTime from 'reading-time';
import { BiMessageSquareCheck, BiDownArrowAlt } from 'react-icons/bi';
import Link from '@/components/customLink';
import { useRouter } from 'next/router';
import Reactions from '@/components/posts/reaction';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import useIsRead from '@/hooks/useIsRead';
import useViewCount from '@/hooks/useViewCount';

//lib
import {
  getContentPaths,
  getContentSlug,
  getContentIndex,
} from '@/lib/fetcher';
import { cardTwitter } from '@/lib/seo';

//components
import ViewsCount from '@/components/views-count';
import Ads from '@/components/posts/adsense';
import Comment from '@/components/posts/comment';
import { Embed } from '@/components/embed';

//data
import DataSeo from '@/_data/seo.json';

//types
export interface frontmatter {
  title: string;
  description: string;
  date: Date;
  tags: Array<string>;
  header: string;
  contributors?: Array<string>;
}

export interface Props {
  frontmatter: frontmatter;
  content: string;
  slug: {
    current: string;
  };
  code: string;
  isTwoLanguages: boolean;
}

export type TocProps = {
  id: string;
  name: string | null;
  level: number;
};

//jsx
const Posts = ({ frontmatter, content, slug, code, isTwoLanguages }: Props) => {
  const [toc, setToc] = React.useState([] as Array<TocProps>);
  const [tocOpen, setTocOpen] = React.useState(false);
  const [isEn, setIsEn] = React.useState<boolean>(true);
  const router = useRouter();
  const generalSlug = slug.current.endsWith('-id')
    ? slug.current.replace('-id', '')
    : slug.current;

  // custom hooks for register (isRead)
  const { setIsRead } = useIsRead(generalSlug);
  const { setViewCount } = useViewCount(generalSlug);

  React.useEffect(() => {
    //get toc
    const HeadingArr: TocProps[] = [];
    const headings = document.querySelectorAll('article h2, article h3');
    headings.forEach((heading) => {
      HeadingArr.push({
        id: heading.id,
        name: heading.textContent,
        level: +heading.tagName.replace('H', ''),
      });
    });
    setToc(HeadingArr);

    //set View Count
    setViewCount();

    //Set already read to true
    setIsRead();

    if (isEn) {
      setIsEn(!router.asPath.endsWith('-id'));
    } else {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const { title, description, date, contributors } = frontmatter;
  const ogimage = `https://res.cloudinary.com/dlpb6j88q/image/upload/w_1200,h_630,c_limit%2Cf_auto%2Cfl_progressive%2Cq_75/w_600,h_630,c_fill,l_jagad.dev:posts:${generalSlug}:header/fl_layer_apply,g_east/w_192,h_630,c_fill,l_jagad.dev:hr/fl_layer_apply,g_west,x_485/w_500,h_630,c_fit,co_rgb:ffffff,g_west,x_60,y_-40,l_text:arial_50_bold:${encodeURIComponent(
    title
  ).replace(`'`, '%27')}/jagad.dev/social.png`;

  return (
    <main className='prose prose-base prose-invert mx-auto mb-16 max-w-none sm:mb-28'>
      {/* Next Seo */}
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/posts/${slug.current}`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/posts/${slug.current}`,
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
          site_name: `${title} - Jagad Yudha Awali`,
        }}
        twitter={cardTwitter}
      />

      {/* JsonLd */}
      <ArticleJsonLd
        url={`${DataSeo.url}/posts/${slug.current}`}
        title={`${title} — Jagad Yudha Awali`}
        images={[ogimage]}
        datePublished={new Date(date).toISOString()}
        dateModified={new Date(date).toISOString()}
        authorName={['Jagad Yudha Awali']}
        publisherName='jagad.dev'
        publisherLogo='/assets/images/me.png'
        description={description}
      />

      {/* Toc Modal Button */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className='fixed top-20 right-0 z-20'
      >
        <div className='rounded-l-md bg-background_100 p-2'>
          <span className='absolute left-0 top-0 inline-flex h-3 w-3 animate-ping rounded-full bg-primary opacity-75'></span>
          <HiOutlineClipboardList className='text-2xl' />
        </div>
      </button>

      {/* ToC Modal Open */}
      <>
        {tocOpen && (
          <div
            onClick={() => setTocOpen(!tocOpen)}
            className='fixed right-0 top-0 z-20 h-screen w-full'
          ></div>
        )}
        <div
          className={`${
            tocOpen ? ' translate-x-0' : 'translate-x-full'
          } fixed right-0 top-0 z-20 h-screen w-3/4 border-l border-l-white border-opacity-20 bg-background px-4 py-10 transition-all duration-300 md:w-1/3 xl:w-1/6`}
        >
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className=' float-right -mt-1 rounded-md p-[5px]'
          >
            <IoCloseOutline className={`text-2xl text-white`} />
          </button>
          <span className='text-md mb-5 block font-bold text-white'>
            Contents
          </span>
          <ol>
            {toc.length > 0 &&
              toc.map((item) => (
                <div key={item.id}>
                  {item.level === 2 && (
                    <li>
                      <Link href={`#${item.id}`}>
                        <a>
                          <span className='text-md my-0.5 '>{item.name}</span>
                        </a>
                      </Link>
                    </li>
                  )}

                  <ul>
                    {item.level === 3 && (
                      <li>
                        <Link href={`#${item.id}`}>
                          <a>
                            <span className='text-md my-0.5 block '>
                              {item.name}
                            </span>
                          </a>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
          </ol>
        </div>
      </>

      {/* frontmatter content */}
      <div className='relative -mt-28 min-h-[105vh]'>
        {/* Image */}
        <div className='absolute h-full w-full opacity-40'>
          <Image
            src={`/jagad.dev/posts/${
              slug.current.endsWith('-id')
                ? slug.current.replace('-id', '')
                : slug.current
            }/header`}
            layout='fill'
            objectFit='cover'
            alt={title}
          />
        </div>

        {/* Metadata */}
        <div className='relative flex h-full min-h-[105vh] w-full items-center justify-center bg-gradient-to-t from-background to-transparent pt-32  text-center xs:pt-20 sm:pt-0'>
          <div className='mx-5 max-w-3xl'>
            {/* Title */}
            <h1 className='text-white sm:text-5xl'>{title}</h1>

            {/* Description */}
            <p className='text-md mx-auto text-center text-gray-400 sm:text-lg'>
              {description}
            </p>

            <div className='my-10 text-gray-400'>
              {/* Date */}
              <p className='text-md'>
                {`Posted by Jagad on ${new Date(date).toLocaleString(
                  'default',
                  {
                    month: 'long',
                  }
                )} ${new Date(date).getDate()}, ${new Date(
                  date
                ).getFullYear()}`}
              </p>

              {/* Views */}
              <div className='text-md -mt-10 flex items-center justify-center gap-1'>
                <ViewsCount slug={generalSlug} /> •
                <p>{readingTime(content).text} </p>
              </div>
            </div>

            {/* Button to change languages */}
            <div className='mx-auto  text-center'>
              {isTwoLanguages && (
                <div className='mx-auto '>
                  <Link
                    href={`/posts/${
                      slug.current.endsWith('-id')
                        ? slug.current.replace('-id', '')
                        : slug.current.concat('-id')
                    }`}
                  >
                    <button className='rounded-md border  border-primary px-3 py-2 text-sm font-medium text-primary'>
                      Read in{' '}
                      {!slug.current.endsWith('-id')
                        ? 'Bahasa Indonesia'
                        : 'English'}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        id='article'
        className='mx-auto my-10 max-w-6xl flex-none px-6 sm:my-20 md:px-24 lg:flex lg:space-x-8 xl:px-0'
      >
        {/* Content */}
        <div className='mx-auto w-full'>
          {/* Adsense */}
          <div className='block lg:hidden'>
            <Ads />
          </div>

          {/* Article content */}
          <article className='mx-auto '>
            <Component components={{ Image, Ads, a: Link, Embed } as any} />
          </article>
        </div>

        {/* Sidebar */}
        <div className='my-10 space-y-6 lg:w-1/2'>
          <div>
            <span className='mb-4 flex justify-center'>Post Reactions</span>
            <Reactions slug={generalSlug} />
          </div>

          {/* Contributor List */}

          <div>
            <span className='mb-4 flex justify-center'>Contributors</span>
            <div className='rounded-md bg-background_100 p-5 '>
              {contributors && (
                <>
                  {contributors?.map((item, index) => (
                    <span className='flex items-center' key={index}>
                      <BiMessageSquareCheck className='mr-2 text-primary' />
                      {item}
                    </span>
                  ))}
                  <hr className='my-8' />
                </>
              )}

              <p>
                The writing on this website may contain errors in grammar,
                punctuation, etc. Please make a contribution here.
              </p>
            </div>
          </div>

          <div className='hidden xl:sticky xl:top-10 xl:my-0 xl:block xl:self-start'>
            <span className='flex justify-center'>Ads</span>
            <Ads />
          </div>
        </div>
      </div>
      {/* Comment Section */}
      <section className='max-w-5xl px-6 md:mx-auto'>
        <hr className='my-8 opacity-20' />
        <Comment />
      </section>
    </main>
  );
};

export const getStaticPaths = async () => {
  const paths = await getContentPaths('posts');

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  //check if slug is id
  const posts = await getContentIndex('posts');
  const checkTranslation = posts.filter(
    (item: Props) =>
      item.slug.current ===
      `${
        params.slug.endsWith('id')
          ? params.slug.replace('-id', '')
          : params.slug
      }-id`
  );

  const isTwoLanguages = checkTranslation.length > 0 ? true : false;

  let data;
  try {
    data = await getContentSlug(
      params.slug,
      'posts' //<--- content --->
    );
  } catch (e) {
    return {
      notFound: true,
    };
  }

  const { frontmatter, code, content } = data;

  return {
    props: {
      frontmatter,
      content,
      code,
      isTwoLanguages,
      slug: {
        current: params.slug,
      },
    },
    revalidate: 1,
  };
};

export default Posts;
