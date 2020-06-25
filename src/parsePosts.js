const ejs = require('ejs');
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter');

const { readDir, mkdir, readFileSync, writeFile } = require('./file')
const { POSTS_PATH, POST_LAYOUT_PATH, DIST_PATH, postDistPath } = require('./paths')

const EJS_OPTIONS = {
  rmWhitespace: true
}

let loadedPostTemplate = null

/**
 * @returns {ejs.AsyncTemplateFunction}
 */
function postTemplate() {
  if (loadedPostTemplate) {
    return loadedPostTemplate;
  }

  const layout = readFileSync(POST_LAYOUT_PATH)

  loadedPostTemplate = ejs.compile(layout, EJS_OPTIONS);

  return loadedPostTemplate
}

/**
 *
 * @param {Object} meta
 * @param {string} meta.title
 * @param {string} meta.postName
 * @param {string} mdContent
 */
function writePost(meta, mdContent) {
  const { postName } = meta
  const template = postTemplate()
  const content = marked(mdContent)
  const rendered = template({
    content,
    meta,
  })

  const distPath = postDistPath(postName)
  writeFile(distPath, rendered).catch(err => console.error(err))
}

/**
 * parse posts, write html to dist
 * @returns {Promise<object[]>} - all meta data
 */
async function parsePosts() {
  const filenames = await readDir(POSTS_PATH)

  const postNames = filenames.filter(name => name.match(/.md$/))

  await mkdir(DIST_PATH)

  const allMeta = []
  postNames.forEach(postName => {
    const filePath = path.join(POSTS_PATH, postName)

    const { data, content } = matter.read(filePath)

    const meta = {
      ...data,
      postName,
    }

    writePost(meta, content)
    allMeta.push(meta)
  })

  return allMeta
}

module.exports = {
  parsePosts
}
