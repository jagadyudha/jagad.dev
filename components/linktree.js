import React from "react";

function linktree({ icon, link, title }) {
  return (
    <section className="dark:hover:bg-mybg hover:bg-mybglight">
      <a target="_blank" rel="noopener" rel="noreferrer" href={link}>
        <div className="border dark:border-white dark:border-opacity-20 border-black border-opacity-20 rounded-md py-5">
          {icon}
          <p className="text-lg dark:text-white text-black text-center">
            {title}
          </p>
        </div>
      </a>
    </section>
  );
}

export default linktree;
