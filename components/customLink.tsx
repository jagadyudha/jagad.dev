import React from 'react';
import Link from 'next/link';
import { LinkProps } from 'next/link';

export type Props = {
  href: string;
  className?: string;
} & LinkProps;

const customLink: React.FC<Props> = ({ href, children, ...props }) => {
  const isExternal = href.startsWith('http') ? false : true;
  if (isExternal) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  }

  return (
    <a {...props} href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );
};

export default customLink;
