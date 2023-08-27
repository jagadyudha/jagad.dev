import React from 'react';

import useSWR from 'swr';

const useViewCount = (slug: string) => {
  const [viewCount, setViewCount] = React.useState<number | null>(0);

  //fetch using swr
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  React.useEffect(() => {
    if (data && data.views) {
      setViewCount(data.views.count);
    }
  }, [data]);

  //register view
  const registerView = () =>
    fetch(`/api/views/${slug}`, {
      method: 'POST',
    });

  return { viewCount, setViewCount: registerView };
};

export default useViewCount;
