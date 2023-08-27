export type PostRawProps = {
  markdown: string;
  slug: {
    current: string;
  };
};

export type PostProps = {
  content: string;
  slug: string;
  frontmatter: {
    slug: string;
    title: string;
    header: string;
    description: string;
    date: Date;
    tags: Array<string>;
  };
  code?: string;
};

export type ProjectRawProps = PostRawProps;

export type ProjectProps = {
  content: string;
  slug: string;
  frontmatter: {
    slug: string;
    title: string;
    description: string;
    date: Date;
    stack: Array<string>;
    header: string;
  };
  code?: string;
};

export type TocProps = {
  id: string;
  name: string | null;
  level: number;
};
