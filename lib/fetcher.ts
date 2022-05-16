import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getContentIndex = (dir: string) => {
  const files = fs.readdirSync(`./contents/${dir}`);
  const data = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const fullPath = path.join(process.cwd(), `./contents/${dir}`, fileName);
    const readFile = fs.readFileSync(fullPath, 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      frontmatter,
      content,
    };
  });

  return data;
};
