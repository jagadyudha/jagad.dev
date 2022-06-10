import React from 'react';
import { useDetectAdBlock } from 'adblock-detect-react';
import { IoWarningOutline } from 'react-icons/io5';
const Adsense = () => {
  const adblock = useDetectAdBlock();

  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error: any) {
      console.log('adsense error', error.message);
    }
  }, []);

  return (
    <>
      {adblock ? (
        <div className='mt-4 rounded-md bg-[#FBBD23] bg-opacity-20 p-4'>
          <div className='flex items-center space-x-2'>
            <IoWarningOutline className='text-xl' />
            <span className='font-bold text-white'>Warning!</span>
          </div>
          <p className='font-light text-gray-200'>
            Please disable your adBlock to support our site and free contents
            from jagad.dev
          </p>
        </div>
      ) : (
        <div className='mt-4'>
          <ins
            className='adsbygoogle'
            style={{
              display: 'block',
              margin: '6px !important',
            }}
            data-ad-client='ca-pub-1510507608200585'
            data-ad-slot='5136962755'
            data-ad-format='auto'
            data-full-width-responsive='true'
          />
        </div>
      )}
    </>
  );
};

export default Adsense;
