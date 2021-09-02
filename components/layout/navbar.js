import React from "react";
import DarkMode from "./darkmode";

function navbar() {
  const [colorTheme, setTheme] = DarkMode();
  return (
    <div className="sticky top-0 z-50 dark:bg-mydark bg-mylight backdrop-filter backdrop-blur-lg dark:bg-opacity-60 bg-opacity-50">
      <nav className="flex max-w-3xl mx-auto text-center sm:text-right py-4 items-center justify-between px-5">
        {colorTheme === "light" ? (
          <button
            onClick={() => setTheme("light")}
            className="bg-white bg-opacity-10 rounded-md font-normal text-md sm:text-lg p-2 sm:mr-2 mr-0"
          >
            ☀️
          </button>
        ) : (
          <button
            onClick={() => setTheme("dark")}
            className="bg-black bg-opacity-10 rounded-md font-normal text-md sm:text-lg p-2 sm:mr-2 mr-0"
          >
            🌙
          </button>
        )}
        <div>
          <a
            href="/"
            className="dark:text-gray-300 text-gray-700 font-normal text-md sm:text-lg p-2 sm:mr-2 mr-0"
          >
            Home
          </a>
          <a
            href="/projects"
            className="dark:text-gray-300 text-gray-700 font-normal text-md sm:text-lg p-2 sm:mr-2 mr-0"
          >
            Project
          </a>
          <a
            href="/photos"
            className="dark:text-gray-300 text-gray-700 font-normal text-md sm:text-lg p-2 sm:mr-2 mr-0"
          >
            Photo
          </a>
          <a
            href="/linktree"
            className="dark:text-gray-300 text-gray-700 font-normal text-md sm:text-lg p-2 sm:mr-2 mr-0"
          >
            Linktree
          </a>
        </div>
      </nav>
    </div>
  );
}

export default navbar;
