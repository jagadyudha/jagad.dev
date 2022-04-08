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
    <figure>
      <NextImage
        onClick={() =>
          (router.pathname === '/posts/[slug]' ||
            router.pathname === '/projects/[slug]') &&
          setIsOpen(true)
        }
        src={src}
        className={`${className} scale-125 transform-gpu rounded-md transition-[opacity,transform,filter] will-change-transform hover:cursor-zoom-in ${
          isReady && 'scale-100 duration-[1.3s] ease-in-out'
        }`}
        {...props}
        onLoadingComplete={onLoadCallback}
        placeholder='blur'
        blurDataURL={
          blurDataURL ? blurDataURL : '/assets/images/placeholder.jpg'
        }
      />

      {isOpen && (
        <Lightbox mainSrc={lightbox} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
};

export default Image;
