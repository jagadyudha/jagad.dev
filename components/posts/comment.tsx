import React from 'react';
import { Giscus } from '@giscus/react';

const Comment = () => {
  return (
    <Giscus
      repo='jagadyudha/jagad.dev'
      repoId={process.env.NEXT_PUBLIC_COMMENT_REPOID!}
      category='Announcements'
      categoryId={process.env.NEXT_PUBLIC_COMMENT_CATEGORYID}
      mapping='title'
      reactionsEnabled='1'
      emitMetadata='0'
      theme='transparent_dark'
    />
  );
};

export default Comment;
