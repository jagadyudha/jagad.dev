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
        {items.map((item) => {
          const contentTitle = item.fields.title;
          const contentSlug = `projects/${item.fields.slug}`;
          const contentDesc = item.fields.desc;
          const contentLabel = item.fields.label;
          return (
            <div key={contentTitle} className='-mx-4'>
              <Link href={contentSlug}>
                <a>
                  <div className='transition duration-500 rounded-md hover:bg-mybg'>
                    <div className='py-4 mx-4'>
                      <h2 className='font-sans font-bold text-white sm:text-xl text-lg'>
                        {contentTitle}
                      </h2>
                      <p className='sm:text-lg text-md font-sans font-normal text-gray-300'>
                        {contentDesc}
                      </p>

                      <div className='sm:flex justify-between flex-none py-2'>
                        <div>
                          {contentLabel
                            .slice(0)
                            .reverse()
                            .map((item) => (
                              <span
                                className='bg-white bg-opacity-10 text-center shadow-md text-white rounded-2xl text-sm py-1 px-2 font-sans font-normal mr-1'
                                key={item}
                              >
                                {item}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <Link href='projects'>
        <a className='justify-left flex text-center items-center '>
          <span className='font-sans font-semibold text-lg text-myorange my-5 mr-2'>
            View All Projects
          </span>
          <IoArrowForwardOutline className=' text-myorange text-2xl' />
        </a>
      </Link>
    </div>
  );
};

export default Projects;
