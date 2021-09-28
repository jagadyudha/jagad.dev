import Image from 'next/image';

const Photos = ({ items }) => {
  return (
    <div className='mb-16 container'>
      <h1 className='font-sans font-bold text-white sm:text-4xl text-3xl mb-1'>
        Latest Photo
      </h1>
      <p className='font-sans font-normal sm:text-lg text-md text-gray-300 mb-10'>
        Collection of momment that i capture
      </p>

      <div>
        {items.slice(0, 1).map((item) => (
          <div key={item.fields.title}>
            <div className='pb-5'>
              <a href={'/photos/' + item.fields.slug}>
                <Image
                  width={500}
                  height={500}
                  layout='responsive'
                  className='rounded-md'
                  src={'https:' + item.fields.img[0].fields.file.url}
                  alt={item.fields.slug}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
      <a href='photos' className='justify-center flex flex-row text-center'>
        <span className='font-sans font-semibold text-lg text-myorange mx-2 my-5 hover:underline'>
          View all Photos ➔
        </span>
      </a>
    </div>
  );
};

export default Photos;
