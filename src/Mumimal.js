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

class Mumimal {
  constructor(config = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    }
    this.posts = []
  }

  async run() {
    await copyStatic()
    this.posts = await parsePosts()
    await buildIndex(this)
  }
}

module.exports = {
  Mumimal
}
