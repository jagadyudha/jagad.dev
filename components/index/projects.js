import Link from 'next/link';
import { IoArrowForwardOutline } from 'react-icons/io5';

const Projects = ({ items }) => {
  return (
    <div className='mb-16'>
      <h1 className='font-sans font-bold text-white md:text-4xl text-3xl mb-1'>
        Latest Project
      </h1>
      <p className='font-sans font-normal mb-10 sm:text-lg text-md text-gray-300'>
        latest project that I have created.
      </p>
      <div className='mx-auto'>
        {items.slice(0, 5).map((item, index) => (
          <div
            key={item.fields.title}
            className='my-5 border-b pb-4 border-opacity-20'
          >
            <Link href={`projects/${item.fields.slug}}`}>
              <a className='flex items-center justify-between'>
                <div className='flex'>
                  <p className='text-white mr-5'>{index + 1}</p>
                  <h2 className='font-sans font-semibold text-white text-lg'>
                    {item.fields.title}
                  </h2>
                </div>
                <p className='text-white text-sm xl:text-md bg-white bg-opacity-10 px-2 py-1 rounded-full'>
                  #{item.fields.label[0]}
                </p>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Link href='projects'>
        <a className='justify-left flex text-center items-center '>
          <span className='font-sans font-semibold text-lg text-myorange my-5 mr-2'>
            View all Projects
          </span>
          <IoArrowForwardOutline className=' text-myorange text-2xl' />
        </a>
      </Link>
    </div>
  );
};

export default Projects;
