import React from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

function navbar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  return (
    <div className="sticky top-0 z-50 dark:bg-mydark bg-mylight backdrop-filter backdrop-blur-lg dark:bg-opacity-60 bg-opacity-50">
      <nav className="flex max-w-3xl mx-auto text-center sm:text-right py-4 items-center justify-between px-5">
        <button
          type="button"
          className="p-3 bg-gray-300 rounded dark:bg-gray-600 my-auto"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <div className="mx-auto">
              {resolvedTheme === 'dark' ? (
                <IoSunny className="text-white text-md sm:text-lg" />
              ) : (
                <IoMoon className="text-black text-md sm:text-lg" />
              )}
            </div>
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
