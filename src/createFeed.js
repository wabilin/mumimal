const { Feed } = require('feed');
const { JSDOM } = require('jsdom');
const { readPostSrc } = require('./parsePosts');
const { DIST_FEED_PATH, DIST_RSS_PATH } = require('./paths');
const { writeFile } = require('./file');

/**
 * @param {HTMLElement} article
 */
function transformContent(content, siteUrl) {
  const { document } = new JSDOM(`<article>${content}</article>`).window;
  const article = document.querySelector('article');

  article.querySelectorAll('img').forEach((img) => {
    // eslint-disable-next-line no-param-reassign
    img.src = img.src.replace('./', siteUrl);
  });

  article.querySelectorAll('source').forEach((source) => {
    // eslint-disable-next-line no-param-reassign
    source.srcset = source.srcset.replace('./', siteUrl);
  });

  article.querySelectorAll('a').forEach((a) => {
    // eslint-disable-next-line no-param-reassign
    a.href = a.href.replace('./', siteUrl);
  });

  return article.innerHTML;
}

function writeFeeds(feed) {
  const feedAtom = feed.atom1();
  const feedRss = feed.rss2();

  return Promise.all([
    writeFile(DIST_FEED_PATH, feedAtom),
    writeFile(DIST_RSS_PATH, feedRss),
  ]);
}

/**
 * @param {import('./mumimal').Context} context
 */
function createFeed(context) {
  const { posts, config } = context;
  const { site, feed: feedConfig } = config;
  const siteUrl = site.url;

  const defaultConfig = {
    title: feedConfig.title || site.title,
    description: feedConfig.description || site.description,
    id: siteUrl,
    link: siteUrl,
    language: 'en',
  };
  const feed = new Feed({
    ...defaultConfig,
    ...feedConfig,
  });

  const { categories } = feedConfig;
  if (categories) {
    categories.forEach((category) => {
      feed.addCategory(category);
    });
  }

  posts.slice(0, 10).forEach((post) => {
    const {
      postName, title, description, dateStr,
    } = post;
    const { content } = readPostSrc(postName);
    const fileDistName = postName.replace(/\.md$/, '.html');
    const fileUrl = `${siteUrl}${fileDistName}`;

    feed.addItem({
      title,
      description,
      content: transformContent(content, siteUrl),
      id: fileUrl,
      link: fileUrl,
      date: dateStr ? new Date(dateStr) : new Date(),
    });
  });

  return writeFeeds(feed);
}

module.exports = {
  createFeed,
};
