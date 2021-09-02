import React from "react";

function Header() {
  return (
    <div className="mb-16">
      <h1 className="font-sans font-bold text-black dark:text-white sm:text-5xl text-3xl my-1">
        Jagad Yudha Awali
      </h1>
      <div className="font-sans flex-1 sm:text-lg text-md  dark:text-gray-300 text-gray-600 my-5">
        I'm a front-end developer & UI/UX designer based on Sidoarjo, Indonesia.
        Interested working on front-end and currently learning about react
        native framework. if you want to work with me or ask something, reach me
        via{" "}
        <a
          className="text-myorangelight dark:text-myorange underline hover:opacity-50"
          href="mailto:jagadyudhaawali@gmail.com"
        >
          email
        </a>{" "}
        or check my{" "}
        <a
          className="text-myorangelight dark:text-myorange underline hover:opacity-50"
          href="/linktree"
        >
          link tree
        </a>{" "}
        for other social media.
      </div>
    </div>
  );
}

export default Header;
