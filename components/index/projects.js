const Projects = ({ items }) => {
  return (
    <div className='mb-16'>
      <h1 className='font-sans font-bold text-white md:text-4xl text-3xl mb-1'>
        Latest Project
      </h1>
      <p className='font-sans font-normal mb-10 sm:text-lg text-md text-gray-300'>
        Latest project that i have created.
      </p>
      <div className='mx-auto'>
        {items.slice(0, 5).map((item) => (
          <div key={item.fields.title} className='my-5'>
            <a href={'projects/' + item.fields.slug}>
              <h1 className='font-sans font-semibold text-white text-lg'>
                {item.fields.title}
              </h1>
              <p className='sm:text-lg text-md font-sans font-normal text-gray-300'>
                {item.fields.desc}
              </p>
            </a>
          </div>
        ))}
      </div>
      <a href='projects' className='justify-center flex flex-row text-center'>
        <span className='font-sans font-semibold text-lg text-myorange mx-2 hover:underline'>
          View all Projects ➔
        </span>
      </a>
    </div>
  );
};

export default Projects;
