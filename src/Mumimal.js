//@ts-check

const { parsePosts } = require('./parsePosts')
const { buildIndex } = require('./buildIndex')

/** @type {Mumi.Config} */
const DEFAULT_CONFIG = {
  site: {
    name: "",
  },
  ejsOption: {
  }
}

/** @type {Mumi.Mumimal} */
class Mumimal {
  constructor(config = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    }
    this.posts = []
  }

  async run() {
    this.posts = await parsePosts()
    buildIndex(this)
  }
}

module.exports = {
  Mumimal
}
