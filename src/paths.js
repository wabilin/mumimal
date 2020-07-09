const path = require('path')
const { PWD } = process.env

const POSTS_PATH = path.join(PWD, 'posts')
const LAYOUTS_PATH = path.join(PWD, 'layouts')
const STATIC_PATH = path.join(PWD, 'static')
const POST_LAYOUT_PATH = path.join(LAYOUTS_PATH, 'post.ejs')
const INDEX_LAYOUT_PATH = path.join(LAYOUTS_PATH, 'index.ejs')

const DIST_PATH = path.join(PWD, 'dist')
const DIST_INDEX_PATH = path.join(DIST_PATH, 'index.html')
const DIST_FEED_PATH = path.join(DIST_PATH, 'feed.xml')
const DIST_RSS_PATH = path.join(DIST_PATH, 'rss.xml')

/**
 * @param {*} filename
 */
function postSrcPath(filename) {
  return path.join(POSTS_PATH, filename)
}

/**
 * @param {*} filename
 */
function postDistPath(filename) {
  const pre = filename.replace(/.md$/, '')
  const name = `${pre}.html`
  return path.join(DIST_PATH, name)
}

module.exports = {
  POSTS_PATH,
  LAYOUTS_PATH,
  STATIC_PATH,
  INDEX_LAYOUT_PATH,
  POST_LAYOUT_PATH,
  DIST_PATH,
  DIST_INDEX_PATH,
  DIST_FEED_PATH,
  DIST_RSS_PATH,
  postSrcPath,
  postDistPath,
}
