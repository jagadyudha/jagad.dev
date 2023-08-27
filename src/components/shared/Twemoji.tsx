import React, { memo } from 'react';

import twemoji from 'twemoji';

export interface Props {
  emoji: string;
}

const Twemoji: React.FC<Props> = ({ emoji }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg',
      }) as any,
    }}
  />
);

export default memo(Twemoji);
