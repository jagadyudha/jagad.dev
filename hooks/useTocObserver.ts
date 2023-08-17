import React from 'react';
import { useRouter } from 'next/router';

const useTocObserver = () => {
  const observer = React.useRef<IntersectionObserver | undefined>();
  const [activeId, setActiveId] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const handleObsever = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: '-20% 0% -35% 300px',
    });

    const elements = document.querySelectorAll('article h2, article h3');
    elements.forEach((elem) => observer.current!.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  React.useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if(hash){
      setActiveId(hash)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return {
    tocActiveId: activeId,
    setActiveId: (id: string) => {
      setActiveId(id);
    },
  };
};

export default useTocObserver;