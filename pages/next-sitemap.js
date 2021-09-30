module.exports = {
  siteUrl: 'jagad.xyz',
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://example.com/server-sitemap.xml', // <==== Add here
    ],
  },
};
