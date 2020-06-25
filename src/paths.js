const path = require('path')
const { PWD } = process.env

const POSTS_PATH = path.join(PWD, 'posts')
const LAYOUTS_PATH = path.join(PWD, 'layouts')
const POST_LAYOUT_PATH = path.join(LAYOUTS_PATH, 'post.ejs')

const DIST_PATH = path.join(PWD, 'dist')

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
  POST_LAYOUT_PATH,
  DIST_PATH,
  postDistPath,
}
