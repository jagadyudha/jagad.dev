import React, { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import Lightbox from 'react-image-lightbox';
import { useRouter } from 'next/router';

const Image: React.FC<ImageProps> = ({
  src,
  className,
  blurDataURL,
  ...props
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  const lightbox: any = src;
  const router = useRouter();

  return (
    <figure
      className={`${className ? className : 'rounded-md'} overflow-hidden`}
    >
      <NextImage
        onClick={() =>
          (router.pathname === '/posts/[slug]' ||
            router.pathname === '/projects/[slug]') &&
          setIsOpen(true)
        }
        src={src}
        className={`${
          className ? className : 'rounded-md'
        } transform-gpu bg-zinc-600 transition-[opacity,transform,filter] duration-[1.2s] ease-in-out will-change-transform hover:cursor-zoom-in ${
          isReady ? 'blur-0' : 'animate-pulse blur-3xl'
        }`}
        {...props}
        onLoadingComplete={onLoadCallback}
        layout='responsive'
      />

      {isOpen && (
        <Lightbox mainSrc={lightbox} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
};

export default Image;
