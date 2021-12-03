import React from 'react';
import Image from '@/components/image'

export interface PhotoCardProps{
    title:string
    image:Array<any>
    blurhash:Array<string>

}

export interface SlugImageProps {
    fields: {
      file: {
        url: string;
      }
      title:string
    };
  }

const PhotoCard:React.FC<PhotoCardProps> = ({title, image, blurhash}) => {
  return (
    <>
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        {title}
      </h1>

      <div className='pb-10 my-10'>
        <div className='grid grid-cols-1 gap-5'>
          {image.map((item: SlugImageProps, index: number) => {
            const imgUrl = item.fields.file.url;
            const alt = item.fields.title;
            return (
              <div key={item.fields.file.url}>
                <div className='rounded-lg relative object-cover overflow-hidden'>
                  <Image
                    blurDataURL={blurhash[index]}
                    placeholder='blur'
                    width={500}
                    height={500}
                    layout='responsive'
                    src={`https:${imgUrl}`}
                    alt={alt}
                  />
                </div>
                <p className='text-center text-white text-md'>{alt}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PhotoCard;
