import React from 'react';

import useViewCount from '@/hooks/useViewCount';

export interface Props {
  slug: string;
}

const Views: React.FC<Props> = ({ slug }) => {
  const { viewCount } = useViewCount(slug);
  if (!viewCount) return <>-- views</>;

  return <>{viewCount} views</>;
};

export default Views;
