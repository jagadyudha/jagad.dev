import { getContentful } from '../../lib/contentful';

export default async function handler(req, res) {
  const response = await getContentful('project');
  const getSlug = response.data.items.map((item) => ({
    loc: `https://jagad.xyz/${item.fields.slug}`,
    lastmod: new Date().toISOString(),
  }));
  return res.status(200).json({
    getSlug,
  });
}
