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
      className={`transition duration-300 delay-300 rounded-lg ${
        isReady ? 'scale-100' : 'scale-100'
      }`}
      {...props}
      onLoadingComplete={onLoadCallback}
    />
  );
};

export default Image;
