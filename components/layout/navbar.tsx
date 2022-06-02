import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Posts', href: '/posts' },
  { name: 'Projects', href: '/projects' },
  { name: 'Activites', href: '/activities' },
  { name: 'About', href: '/about' },
];

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const checkSlug = router.pathname.endsWith('/[slug]')
    ? router.pathname.replace('/[slug]', '')
    : router.pathname;

  React.useEffect(() => {
    const body = document.querySelector('body');
    body!.style.overflow = isOpen ? 'hidden' : 'auto';

    if (isOpen) {
      window.addEventListener('scroll', (e) => {
        e.preventDefault();
      });
    }
  }, [isOpen]);
  return (
    <>
      {/* Desktop View */}
      <nav className='hidden justify-center bg-background py-6 pt-10 sm:flex'>
        <div className='text-lg sm:space-x-14 sm:pr-2 md:ml-10 md:space-x-16 md:pr-4'>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.href === checkSlug ? (
                <a className='border-b-2 border-primary pb-1 text-white'>
                  {item.name}
                </a>
              ) : (
                <a className='text-gray-400 hover:text-primary'>{item.name}</a>
              )}
            </Link>
          ))}
        </div>
      </nav>

      <nav className='block sm:hidden'>
        <div className='flex justify-start py-6 px-6 text-white'>
          <button
            className='rounded-md bg-background_100 p-[5px]'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <IoCloseOutline className={`text-2xl`} />
            ) : (
              <IoMenuOutline className='text-2xl' />
            )}
          </button>
        </div>
        {isOpen && (
          <div className='container absolute z-20 h-screen bg-background px-8'>
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <a>
                  <motion.div
                    initial='pageInitial'
                    animate='pageAnimate'
                    variants={{
                      pageInitial: { opacity: 0, x: '-100%' },
                      pageAnimate: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.2 * index, ease: 'easeInOut' }}
                    className={`border-b border-white border-opacity-20 py-5 text-white`}
                  >
                    {item.name}
                  </motion.div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
