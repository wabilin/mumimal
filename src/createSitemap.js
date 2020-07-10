const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFile } = require('./file');
const { DIST_SITEMAP_PATH } = require('./paths');

/**
 * @param {import('./mumimal').Context} context
 */
async function createSitemap(context) {
  const { posts, config } = context;

  const links = posts.map((post) => {
    const { link, dateStr } = post;

    return {
      url: link,
      lastmod: dateStr,
    };
  });

  const stream = new SitemapStream({
    hostname: config.site.url,
  });

  stream.write({
    url: '/',
    lastmod: (new Date()).toISOString(),
  });
  links.forEach((link) => stream.write(link));
  stream.end();

  const data = await streamToPromise(stream);
  const text = data.toString();

  return writeFile(DIST_SITEMAP_PATH, text);
}

module.exports = {
  createSitemap,
};
