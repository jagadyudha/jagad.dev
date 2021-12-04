import React from 'react';
import SocialCard from '../components/socialcard';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoLogoTiktok,
} from 'react-icons/io5';
import { FaTelegram } from 'react-icons/fa';
import { NextSeo } from 'next-seo';
import { cardOpenGraph, cardTwitter } from '../lib/seo';

const classIcon = 'text-white text-2xl';

const items = [
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/imyour_universe/',
    icon: <IoLogoInstagram className={classIcon} />,
    color: 'bg-[#EC4899]',
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/imyour_universe',
    icon: <IoLogoTwitter className={classIcon} />,
    color: 'bg-[#08A0E9]',
  },
  {
    title: 'Telegram',
    link: 'https://t.me/imyour_universe',
    icon: <FaTelegram className={classIcon} />,
    color: 'bg-[#0088cc]',
  },
  {
    title: 'Youtube',
    link: 'https://www.youtube.com/channel/UChxSF_3EXmlI5TwHOSoc8vQ',
    icon: <IoLogoYoutube className={classIcon} />,
    color: 'bg-[#ff0000]',
  },
  {
    title: 'Linkedin',
    link: 'https://www.linkedin.com/in/jagad-yudha-39a4a51b6/',
    icon: <IoLogoLinkedin className={classIcon} />,
    color: 'bg-[#2867B2]',
  },
  {
    title: 'Tiktok / Gaming',
    link: 'https://www.tiktok.com/@jy_awali/',
    icon: <IoLogoTiktok className={classIcon} />,
    color: 'bg-[#ff0050]',
  },
];

const LinkTree = () => {
  return (
    <>
      <NextSeo
        title='Linktree - Jagad Yudha'
        description='All social media i have'
        canonical='Jagad Yudha - Frontend Developer'
        openGraph={cardOpenGraph}
        twitter={cardTwitter}
      />
      <h1 className='font-sans font-bold text-white sm:text-5xl text-3xl'>
        Linktree
      </h1>
      <div className='my-10 sm:my-20'>
        {items.map((item) => (
          <div className='my-5' key={item.title}>
            <SocialCard
              color={item.color}
              title={item.title}
              link={item.link}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default LinkTree;
