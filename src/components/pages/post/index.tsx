'use client';

import React from 'react';

import { getMDXComponent } from 'mdx-bundler/client';
import { usePathname } from 'next/navigation';

import Ads from '@/components/pages/post/adsense';
import Comment from '@/components/pages/post/comment';
import Toc from '@/components/pages/post/toc';
import Link from '@/components/shared/customLink';
import Embed from '@/components/shared/embed';
import Image from '@/components/shared/image';

import { PostProps } from '@/libs/types';
import { TocProps } from '@/libs/types';

const Post = ({ post, bundler }: { post: PostProps; bundler: string }) => {
  // state
  const [toc, setToc] = React.useState([] as Array<TocProps>);

  // hooks
  const pathname = usePathname();

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const ArticleComponent = React.useMemo(
    () => getMDXComponent(bundler),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bundler],
  );

  const { title, description, createdAt, views } = post;

  return (
    <div className='prose prose-base prose-invert mx-auto mb-16 max-w-none sm:mb-28'>
      <div className='relative -mt-28 min-h-[105vh]'>
        <div className='absolute h-full w-full opacity-40'>
          <Image
            className='object-cover'
            src={`/jagad.dev/posts/${post.slug}/header`}
            fill
            alt={title}
          />
        </div>
        <div className='relative flex h-full min-h-[105vh] w-full items-center justify-center bg-gradient-to-t from-background to-transparent text-center'>
          <div className='mx-5 max-w-3xl'>
            <h1 className='text-3xl text-white sm:text-5xl'>{title}</h1>
            <div className='relative my-10 grid grid-cols-[auto_1fr_auto] items-center gap-x-2'>
              <time className='rounded-lg bg-white bg-opacity-20 p-1 px-2 text-sm'>
                {createdAt}
              </time>
              <div className='w-full border-b'></div>
              <span>{views} views</span>
            </div>
            <div className='flex w-full items-center justify-center'>
              <p className='text-md mb-10 text-center text-gray-400 sm:text-lg md:text-left lg:mb-0'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id='article'
        className='mx-auto my-10 max-w-6xl flex-none px-6 sm:my-20 md:px-24 lg:flex lg:space-x-8 xl:px-0'
      >
        <div className='mx-auto w-full'>
          <article className='mx-auto'>
            <ArticleComponent
              components={{ Image, Ads, a: Link, Embed } as any}
            />
          </article>
          <hr className='my-8 opacity-20' />
          <Comment />
        </div>

        {/* Sidebar */}
        <div className='hidden lg:block my-10 ml-4 space-y-6 lg:w-[40%]'>
          <div className='sticky top-10 rounded-lg border border-gray-700 bg-white bg-opacity-5 backdrop-blur-sm backdrop-filter'>
            <span className='block px-4 py-3 font-medium'>
              Table of Contents
            </span>
            <hr className='m-0' />
            <div className='pr-2'>
              <Toc toc={toc} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
