//@ts-check

const { parsePosts } = require('./parsePosts')
const { buildIndex } = require('./buildIndex')
const { copyStatic } = require('./copyStatic')

const DEFAULT_CONFIG = {
  site: {
    name: "",
  },
  ejsOption: {
  }
}

async function mumimal(userConfig = {}) {
  const config = {
    ...DEFAULT_CONFIG,
    ...userConfig,
  }

  await copyStatic()
  const posts = await parsePosts()

  const context = {
    config,
    posts
  }
  await buildIndex(context)
}

module.exports = {
  mumimal
}
