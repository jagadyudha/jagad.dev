import React, { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  return (
    <NextImage
      src={src}
      className={`transition duration-500 delay-150 ${
        isReady ? 'scale-100' : 'scale-125'
      }`}
      {...props}
      onLoadingComplete={onLoadCallback}
    />
  );
};

export default Image;
