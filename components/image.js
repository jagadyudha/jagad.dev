import React, { useState } from 'react';
import NextImage from 'next/image';

function Image({ onLoadingComplete, customClass, ...props }) {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };
  return (
    <NextImage
      className={`transition duration-1000 ${
        isReady ? 'scale-100' : 'scale-125'
      }`}
      {...props}
      onLoadingComplete={onLoadCallback}
    />
  );
}

export default Image;
