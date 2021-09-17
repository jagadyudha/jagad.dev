import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

function navbar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  return (
    <div className="sticky top-0 z-50 dark:bg-mydark bg-mylight backdrop-filter backdrop-blur-lg dark:bg-opacity-60 bg-opacity-50">
      <nav className="flex max-w-3xl mx-auto text-center sm:text-right py-4 items-center justify-between px-5">
        <button
          type="button"
          className="w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="w-4 h-4 text-mybg dark:text-gray-200"
            >
              {resolvedTheme === "dark" ? (
                <IoSunny className="text-white text-lg sm:text-2xl" />
              ) : (
                <IoMoon className="text-black text-lg sm:text-2xl" />
              )}
            </svg>
          )}
        </button>
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
