import React, { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import Lightbox from 'react-image-lightbox';
import { useRouter } from 'next/router';

const Image: React.FC<ImageProps> = ({ src, className, ...props }) => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  const lightbox: any = src;
  const router = useRouter();

  return (
    <>
      <figure
        className={`${
          className ? className : 'rounded-md'
        } flex justify-center overflow-hidden`}
      >
        <NextImage
          onClick={() =>
            (router.pathname === '/posts/[slug]' ||
              router.pathname === '/projects/[slug]') &&
            setIsOpen(true)
          }
          src={src}
          className={`${className ? className : 'rounded-md'} ${
            isReady ? 'blur-0' : 'animate-pulse bg-zinc-600 blur-2xl'
          }`}
          {...props}
          onLoadingComplete={onLoadCallback}
          unoptimized={lightbox.replace(/^.*\./, '') === 'gif' ? true : false}
        />

        {isOpen && (
          <Lightbox
            mainSrc={lightbox}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </figure>
    </>
  );
};

export default Image;
