import React from 'react';

const useIsRead = (slug: string) => {
  const [hydrated, setHydrated] = React.useState(false);
  const [isRead, setIsRead] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const read = JSON.parse(localStorage.getItem(slug) as string);
      setIsRead(read?.read ?? false);
    }
  }, [hydrated, slug]);

  const handleChange = () => {
    const local = JSON.parse(localStorage.getItem(slug) as string);
    if (typeof window !== 'undefined') {
      localStorage.setItem(slug, JSON.stringify({ ...local, read: true }));
    }
  };

  return { isRead, setIsRead: handleChange };
};

export default useIsRead;
