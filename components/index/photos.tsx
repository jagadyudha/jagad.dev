import Link from 'next/link';
import Image from '@/components/image';
import { IoArrowForwardOutline } from 'react-icons/io5';

export interface PhotosFields {
  title: string;
  slug: string;
  img: Array<any>;
}

export interface PhotosItems {
  fields: PhotosFields;
}

export interface PhotosProps {
  items: PhotosItems[];
  plaiceholders: Array<string>;
}

const Photos: React.FC<PhotosProps> = ({ items, plaiceholders }) => {
  return (
    <div className='mb-16 container'>
      <h1 className='font-sans font-bold text-white sm:text-4xl text-3xl mb-1'>
        Latest Photo
      </h1>
      <p className='font-sans font-normal sm:text-lg text-md text-gray-300 mb-10'>
        a collection of moments that I have captured.
      </p>

      <div>
        {items.slice(0, 1).map((item, index) => (
          <div key={item.fields.title}>
            <div className='pb-5'>
              <Link href={`/photos/${item.fields.slug}`}>
                <a>
                  <div className='rounded-lg relative object-cover overflow-hidden'>
                    <Image
                      placeholder='blur'
                      blurDataURL={plaiceholders[index]}
                      width={500}
                      height={500}
                      layout='responsive'
                      src={'https:' + item.fields.img[0].fields.file.url}
                      alt={item.fields.slug}
                    />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link href='photos'>
        <a className='justify-left flex text-center items-center '>
          <span className='font-sans font-semibold text-lg text-myorange my-5 mr-2'>
            View All Photos
          </span>
          <IoArrowForwardOutline className=' text-myorange text-2xl' />
        </a>
      </Link>
    </div>
  );
};

export default Photos;
