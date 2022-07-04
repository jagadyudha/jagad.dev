import { useState, useEffect } from 'react';

const useViewportScroll = () => {
  const [scroll, setScroll] = useState<number>(0);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
      setIsTransparent(scroll > screen.height - 20 ? false : true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scroll]);

  return { scroll, isTransparent };
};

export default useViewportScroll;
