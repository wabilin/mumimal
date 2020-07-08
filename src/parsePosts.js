const ejs = require('ejs');
const marked = require('marked')
const matter = require('gray-matter');

const { readDir, mkdir, readFileSync, writeFile } = require('./file')
const { POSTS_PATH, POST_LAYOUT_PATH, DIST_PATH, postSrcPath, postDistPath } = require('./paths')

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
 * @typedef {Object} PostMeta
 * @property {string} title
 * @property {string} postName
 * @property {string[]} tags
 * @property {string} [dataStr]
 */

/**
 *
 * @param {PostMeta} meta
 * @param {string} meta.title
 * @param {string} meta.postName
 * @param {string} content
 */
function writePost(meta, content) {
  const { postName } = meta
  const template = postTemplate()
  const rendered = template({
    content,
    meta,
  })

  const distPath = postDistPath(postName)
  writeFile(distPath, rendered).catch(err => console.error(err))
}

/**
 *
 * @param {string} postName
 * @param {Object} data
 * @returns {PostMeta}
 */
function buildMeta(postName, data) {
  const tags = (data.tags || '').split(',').map(x => x.trim())
  const link = postName.replace(/\.md$/, '.html')

  const meta = {
    ...data,
    tags,
    link,
    postName,
  }

  const dateMatch = postName.match(/^\d+-\d+-\d+/)
  if (dateMatch) {
    meta.dateStr = dateMatch[0]
  }

  return meta
}

/**
 * @param {string} postName
 */
function readPostSrc(postName) {
  const filePath = postSrcPath(postName)

  const { data, content: mdContent } = matter.read(filePath)
  const meta = buildMeta(postName, data)
  const content = marked(mdContent)

  return { meta, content }
}

/**
 * parse posts, write html to dist
 * @returns {Promise<PostMeta[]>} - all meta data
 */
async function parsePosts() {
  const filenames = await readDir(POSTS_PATH)

  const postNames = filenames
    .filter(name => name.match(/.md$/))
    .sort((a, b) => a.localeCompare(b) * -1)

  await mkdir(DIST_PATH)

  const allMeta = []
  postNames.forEach(postName => {
    const { meta, content } = readPostSrc(postName)
    writePost(meta, content)
    allMeta.push(meta)
  })

  return allMeta
}

module.exports = {
  readPostSrc,
  parsePosts,
}
