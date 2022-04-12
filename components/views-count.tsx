import React from 'react';
import useSWR from 'swr';

export interface Props {
  slug: string;
}

const ViewsCount: React.FC<Props> = ({ slug }) => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`/api/pageview/${slug}`, fetcher);

  if (!data) return <div>- views</div>;

  return <p>{data.views} views</p>;
};

export default ViewsCount;
