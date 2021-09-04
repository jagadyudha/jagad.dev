import React from "react";
import MyLinkTree from "../components/linktree";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoLogoTiktok,
} from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";

function linktree() {
  return (
    <div>
      <title>yudha • linktree</title>
      <h1 className="font-sans font-bold dark:text-white text-black sm:text-5xl text-3xl mb-20">
        Linktree
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <MyLinkTree
          link="https://www.instagram.com/imyour_universe/"
          name="Instagram"
        >
          <IoLogoInstagram className="text-black dark:text-white text-5xl mx-auto my-2" />
        </MyLinkTree>

        <MyLinkTree link="https://twitter.com/imyour_universe/" name="Twitter">
          <IoLogoTwitter className="text-black dark:text-white text-5xl mx-auto my-2" />
        </MyLinkTree>

        <MyLinkTree link="https://t.me/imyour_universe" name="Telegram">
          <FaTelegram className="text-black dark:text-white text-5xl mx-auto my-2" />
        </MyLinkTree>

        <MyLinkTree
          link="https://www.youtube.com/channel/UChxSF_3EXmlI5TwHOSoc8vQ"
          name="Youtube"
        >
          <IoLogoYoutube className="text-black dark:text-white text-5xl mx-auto my-2" />
        </MyLinkTree>

        <MyLinkTree
          link="https://www.youtube.com/channel/UChxSF_3EXmlI5TwHOSoc8vQ"
          name="Linkedin"
        >
          <IoLogoLinkedin className="text-black dark:text-white text-5xl mx-auto my-2" />
        </MyLinkTree>

        <MyLinkTree
          link="https://www.tiktok.com/@jy_awali/"
          name="Tiktok / Gaming"
        >
          <IoLogoTiktok className="text-black dark:text-white text-5xl mx-auto my-2" />
        </MyLinkTree>
      </div>
    </div>
  );
}

export default linktree;
