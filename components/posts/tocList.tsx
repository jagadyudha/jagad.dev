import React from 'react';
import Link from '../customLink';
import useTocObserver from '@/hooks/useTocObserver';
import clsx from 'clsx';

export type TocProps = {
  id: string;
  name: string | null;
  level: number;
};

const TocList = ({ toc }: { toc: TocProps[] }) => {
  const { tocActiveId, setActiveId } = useTocObserver();
  return (
    <ul className='list-none prose-a:no-underline'>
      {toc.length > 0 &&
        toc.map((item) => (
          <div key={item.id}>
            {item.level === 2 && (
              <li>
                <Link href={`#${item.id}`}>
                  <span
                    onClick={() => setActiveId(item.id)}
                    className={clsx(
                      'my-0.5 text-sm text-white hover:text-primary',
                      tocActiveId === item.id && 'text-primary'
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            )}

            <ul className='list-none'>
              {item.level === 3 && (
                <li>
                  <Link href={`#${item.id}`}>
                    <span
                      onClick={() => setActiveId(item.id)}
                      className={clsx(
                        'my-0.5 text-sm  hover:text-primary',
                        tocActiveId == item.id
                          ? 'text-primary'
                          : 'text-gray-400'
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
    </ul>
  );
};

export default TocList;
