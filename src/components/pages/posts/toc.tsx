import React from 'react';

import clsx from 'clsx';

import CustomLink from '@/components/shared/customLink';

import useTocObserver from '@/hooks/useTocObserver';

export type TocProps = {
  id: string;
  name: string | null;
  level: number;
};

const Toc = ({ toc }: { toc: TocProps[] }) => {
  const { tocActiveId, setActiveId } = useTocObserver();
  return (
    <ul className='list-none prose-a:no-underline'>
      {toc.length > 0 &&
        toc.map((item) => (
          <div key={item.id}>
            {item.level === 2 && (
              <li>
                <CustomLink href={`#${item.id}`}>
                  <span
                    onClick={() => setActiveId(item.id)}
                    className={clsx(
                      'my-0.5 text-sm text-white hover:text-primary',
                      tocActiveId === item.id && 'text-primary',
                    )}
                  >
                    {item.name}
                  </span>
                </CustomLink>
              </li>
            )}

            <ul className='list-none'>
              {item.level === 3 && (
                <li>
                  <CustomLink href={`#${item.id}`}>
                    <span
                      onClick={() => setActiveId(item.id)}
                      className={clsx(
                        'my-0.5 text-sm  hover:text-primary',
                        tocActiveId == item.id
                          ? 'text-primary'
                          : 'text-gray-400',
                      )}
                    >
                      {item.name}
                    </span>
                  </CustomLink>
                </li>
              )}
            </ul>
          </div>
        ))}
    </ul>
  );
};

export default Toc;
