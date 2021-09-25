import { createClient } from 'contentful';

export async function indexFetch(api) {
  const res = await fetch(api);
  const data = await res.json();
  return {
    data,
  };
}

export async function contentfulFetch(api) {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_PROJECT,
    accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
  });
  const data = await client.getEntries({ content_type: api });
  return {
    data,
  };
}

export async function contentfulSlugFetch(api, slug) {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_PROJECT,
    accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
  });
  const data = await client.getEntries({
    content_type: api,
    'fields.slug': slug,
  });
  return {
    data,
  };
}
