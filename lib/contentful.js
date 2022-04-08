import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFULL_SPACE_PROJECT,
  accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
});

export const getContentful = async (content) => {
  const data = await client.getEntries({
    content_type: content,
    order: '-fields.publishDate',
  });
  return data.items;
};

export const getSlugContentful = async (content, slug) => {
  const data = await client.getEntries({
    content_type: content,
    'fields.slug': slug,
  });

  return data.items;
};
