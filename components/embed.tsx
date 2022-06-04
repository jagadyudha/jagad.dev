import React from 'react';

export type EmbedProps = {
  src: string;
};

export const Embed = ({ src }: EmbedProps) => {
  return (
    <div className='relative pt-[56.25%]'>
      <iframe
        className='absolute inset-0 h-full w-full'
        src={src}
        frameBorder='0'
      ></iframe>
    </div>
  );
};
