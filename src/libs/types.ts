export type PostProps = {
  id: number;
  slug: string;
  title: string;
  description: string;
  markdown: string;
  createdAt: string;
  updatedAt: string | null;
  tags: Array<string>;
  header: string;
  views: number;
};

export type WorkProps = Omit<PostProps, 'markdown'>;

export type TocProps = {
  id: string;
  name: string | null;
  level: number;
};
