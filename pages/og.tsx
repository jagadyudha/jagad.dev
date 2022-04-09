import React from 'react';
import Image from '@/components/image';
import { useRouter } from 'next/router';

const Og = () => {
  const router = useRouter();
  const pid = router.query;
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex items-center '>
        <div className='mx-auto mr-5 min-w-[160px] overflow-hidden rounded-full'>
          <Image
            src={'/assets/images/me.png'}
            width={'100%'}
            height={'100%'}
            layout={'responsive'}
            className='rounded-full transition-none'
            alt='Jagad Yudha Awali'
            priority
          />
        </div>
        <div className='w-full max-w-3xl'>
          <h1 className='my-1 font-sans text-3xl font-bold text-teal-500 sm:text-5xl'>
            {pid.title ? pid.title : 'Jagad Yudha Awali'}
          </h1>
          <p className='text-md my-3 flex-1 font-sans text-xl text-white'>
            {pid.description
              ? pid.description
              : 'My personal website to share my projects, blogs, and other stuff.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Og;
