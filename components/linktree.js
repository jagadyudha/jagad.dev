import React from "react";

function linktree({ children, link, name }) {
  return (
    <div className="dark:hover:bg-mybg hover:bg-mybglight">
      <div>
        <a target="_blank" href={link}>
          <div className="border dark:border-white dark:border-opacity-20 border-black border-opacity-20 rounded-md py-5">
            {children}
            <p className="text-lg dark:text-white text-black text-center">
              {name}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default linktree;
