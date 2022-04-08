import DataSeo from '@/_data/seo.json';

export const cardOpenGraph = {
  url: DataSeo.url,
  title: DataSeo.title,
  description: DataSeo.description,
  images: [
    {
      url: DataSeo.ogimage,
      width: 1280,
      height: 720,
      alt: 'Social',
      type: 'image/jpeg',
    },
  ],
  site_name: 'Jagad Yudha Awali - Developer',
};

export const cardTwitter = {
  handle: '@imyour_universe',
  site: '@imyour_universe',
  cardType: 'summary_large_image',
};
