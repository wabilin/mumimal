const path = require('path')
const marked = require('marked')
const matter = require('gray-matter');

const { readDir } = require('./file')
const { POSTS_PATH } = require('./paths')

async function parsePosts() {
  const filenames = await readDir(POSTS_PATH)

  const postNames = filenames.filter(name => name.match(/.md$/))
  const postPaths = postNames.map(name => path.join(POSTS_PATH, name))

  postPaths.forEach(filePath => {
    const { content, data } = matter.read(filePath)
    console.log(JSON.stringify(data))
    console.log(marked(content))
  })
}

module.exports = {
  parsePosts
}
