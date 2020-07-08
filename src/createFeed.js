const { Feed } = require('feed')
const { JSDOM } = require('jsdom')
const { readPostSrc } = require('./parsePosts')
const { DIST_FEED_PATH } = require('./paths')
const { writeFile } = require('./file')

/**
 * @param {import('./mumimal').Context} context
 */
 function createFeed(context) {
  const { posts, config } = context
  const { site, feed: feedConfig } = config
  const siteUrl = site.url

  const defaultConfig = {
      title: feedConfig.title || site.title,
      description: feedConfig.description || site.description,
      id: siteUrl,
      link: siteUrl,
      language: 'en',
  }
  const feed = new Feed({
    ...defaultConfig,
    ...feedConfig,
  });

  const { categories } = feedConfig
  if (categories) {
    categories.forEach(category => {
      feed.addCategory(category)
    })
  }

  posts.slice(0, 10).forEach(post => {
    const { postName, title, description, dateStr } = post
    const { content } = readPostSrc(postName)
    const fileDistName = postName.replace(/\.md$/, '.html')
    const fileUrl = `${siteUrl}${fileDistName}`

    feed.addItem({
      title,
      description,
      content: transformContent(content, siteUrl),
      id: fileUrl,
      link: fileUrl,
      date: dateStr ? new Date(dateStr) : new Date(),
    });
  })

  return writeAtom(feed)
}

function writeAtom(feed) {
  const feedAtom = feed.atom1()
  return writeFile(DIST_FEED_PATH, feedAtom)
}

/**
 * @param {HTMLElement} article
 */
function transformContent(content, siteUrl) {
  const { document } = new JSDOM(`<article>${content}</article>`).window
  const article = document.querySelector('article')

  article.querySelectorAll('img').forEach(img => {
    img.src = img.src.replace('./', siteUrl)
  })

  article.querySelectorAll('source').forEach(source => {
    source.srcset = source.srcset.replace('./', siteUrl)
  })

  article.querySelectorAll('a').forEach(a => {
    a.href = a.href.replace('./', siteUrl)
  })

  return article.innerHTML
}

async function main() {
  const posts = (await getPosts()).sort((a, b) => a.localeCompare(b) * -1)

  for (let post of posts) {
    await parseFile(post)
  }

  const feedAtom = feed.atom1()
  const atomName = path.join(POSTS_PATH, 'feed.xml')

  fs.writeFile(atomName, feedAtom, function (err) {
    if (err) return console.error(err);
  });

  const feedRss = feed.rss2()
  const rssName = path.join(POSTS_PATH, 'rss.xml')
  fs.writeFile(rssName, feedRss, function (err) {
    if (err) return console.error(err);
  });
}


module.exports = {
  createFeed
}
