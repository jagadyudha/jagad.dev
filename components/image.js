import React, { useState } from 'react';
import NextImage from 'next/image';

function Image({ ...props }) {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };
  return (
    <div
      className={`transition duration-400 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <NextImage onLoad={onLoadCallback} {...props} />
    </div>
  );
}

export default Image;
