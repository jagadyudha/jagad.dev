import React, { Children } from 'react';

export interface SocialIcon {
  href: string;
}

const SocialIcon: React.FC<SocialIcon> = ({ children, href }) => {
  return (
    <a
      target='_blank'
      rel='noreferrer noopener'
      href={href}
      className=' text-lg text-gray-400 hover:text-white xl:text-xl'
    >
      {children}
    </a>
  );
};

export default SocialIcon;
