import React, { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import Lightbox from 'react-image-lightbox';
import { useRouter } from 'next/router';

export type Props = {
  src: string;
} & ImageProps;

const Image: React.FC<Props> = ({ src, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  const router = useRouter();
  const convertToWebp = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  const isCloudinary = src.startsWith('/');
  const source = isCloudinary
    ? `https://res.cloudinary.com/dlpb6j88q/image/upload/c_limit%2Cf_auto%2Cfl_progressive%2Cq_75%2Cw_800${convertToWebp}`
    : `https://res.cloudinary.com/dlpb6j88q/image/fetch/c_limit%2Cf_auto%2Cfl_progressive%2Cq_75%2Cw_800/${src}`;

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
          src={source}
          placeholder='blur'
          blurDataURL={source}
          className={`${!isReady && 'animate-pulse bg-zinc-600'} ${
            className ? className : 'rounded-md'
          }`}
          {...props}
          onLoadingComplete={onLoadCallback}
          unoptimized={true}
        />

        {isOpen && (
          <Lightbox
            mainSrc={source.replace(
              '/c_limit%2Cf_auto%2Cfl_progressive%2Cq_75%2Cw_800',
              ''
            )}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </figure>
    </>
  );
};

export default Image;
