import React from "react";
import LinkTree from "../components/linktree";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoLogoTiktok,
} from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";

function linktree() {
  const items = [
    {
      title: "Instagram",
      link: "https://www.instagram.com/imyour_universe/",
      icon: (
        <IoLogoInstagram className="text-black dark:text-white text-5xl mx-auto my-2" />
      ),
    },
    {
      title: "Twitter",
      link: "https://twitter.com/imyour_universe",
      icon: (
        <IoLogoTwitter className="text-black dark:text-white text-5xl mx-auto my-2" />
      ),
    },
    {
      title: "Telegram",
      link: "https://t.me/imyour_universe",
      icon: (
        <FaTelegram className="text-black dark:text-white text-5xl mx-auto my-2" />
      ),
    },
    {
      title: "Youtube",
      link: "https://www.youtube.com/channel/UChxSF_3EXmlI5TwHOSoc8vQ",
      icon: (
        <IoLogoYoutube className="text-black dark:text-white text-5xl mx-auto my-2" />
      ),
    },
    {
      title: "Linkedin",
      link: "https://www.linkedin.com/in/jagad-yudha-39a4a51b6/",
      icon: (
        <IoLogoLinkedin className="text-black dark:text-white text-5xl mx-auto my-2" />
      ),
    },
    {
      title: "Tiktok / Gaming",
      link: "https://www.tiktok.com/@jy_awali/",
      icon: (
        <IoLogoTiktok className="text-black dark:text-white text-5xl mx-auto my-2" />
      ),
    },
  ];

  return (
    <main>
      <title>yudha • linktree</title>
      <h1 className="font-sans font-bold dark:text-white text-black sm:text-5xl text-3xl mb-20">
        Linktree
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.title}>
            <LinkTree title={item.title} link={item.link} icon={item.icon} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default linktree;
