
const { readDir } = require('./file')
const { POSTS_PATH } = require('./paths')

async function parsePosts() {
  const filenames = await readDir(POSTS_PATH)

  filenames.filter(name => name.match(/.md$/)).forEach(x => console.log(x))
}

module.exports = {
  parsePosts
}
