import React from 'react';

export interface Props {
  slot: string;
}

const Adsense: React.FC<Props> = ({ slot }) => {
  return (
    <div className='my-10 mx-6'>
      <ins
        className='adsbygoogle'
        style={{
          display: 'block',
          margin: '6px !important',
        }}
        data-ad-client='ca-pub-1510507608200585'
        data-ad-slot={slot}
        data-ad-format='auto'
        data-full-width-responsive='true'
      ></ins>
    </div>
  );
};

export default Adsense;
