import React from 'react';

const Adsense = () => {
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
    <div className='my-10 mx-6'>
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
  );
};

export default Adsense;
