import Link from 'next/link';

export default function linktree({ icon, link, title }) {
  return (
    <section className='dark:hover:bg-mybg hover:bg-mybglight'>
      <Link href={link} target='_blank' rel='noopener noreferrer'>
        <a>
          <div className='border dark:border-white dark:border-opacity-20 border-black border-opacity-20 rounded-md py-5'>
            {icon}
            <p className='text-lg dark:text-white text-black text-center'>
              {title}
            </p>
          </div>
        </a>
      </Link>
    </section>
  );
}
