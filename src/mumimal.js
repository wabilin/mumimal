//@ts-check

const { parsePosts } = require('./parsePosts')
const { buildIndex } = require('./buildIndex')
const { copyStatic } = require('./copyStatic')
const { createFeed } = require('./createFeed')

const DEFAULT_CONFIG = {
  site: {
    title: "",
    description: "",
    url: "",
  },
  ejsOption: {
  },
  feed: {
    title: "",
    description: "",
    author: "",
  }
}

/**
 * @typedef {Object} Site
 * @property {string} title
 * @property {string} description
 * @property {string} url
 */

 /**
 * @typedef {Object} Feed
 * @property {string} title
 * @property {string} description
 * @property {Object} author
 * @property {string} [language]
 * @property {string} [copyright]
 */

/**
 * @typedef {Object} Config
 * @property {Site} site
 * @property {Feed} feed
 * @property {Object} [ejsOption]
 */

/**
 * @typedef {import('./parsePosts').PostMeta} PostMeta
 */

/**
 * @param {Object} userConfig
 * @returns {Config}
 */
function mergeConfig(userConfig) {
  const {
    site = {},
    ejsOption = {},
    feed = {},
   } = userConfig

   return {
     site: {
       ...DEFAULT_CONFIG.site,
       ...site,
     },
     ejsOption: {
       ...DEFAULT_CONFIG.ejsOption,
       ...ejsOption,
     },
     feed: {
       ...DEFAULT_CONFIG.feed,
       ...feed,
     },
   }
}

/**
 * @typedef {Object} Context
 * @property {Config} config
 * @property {PostMeta[]} posts
 */
async function mumimal(userConfig = {}) {
  const config = mergeConfig(userConfig)

  await copyStatic()
  const posts = await parsePosts()

  /** @type {Context} */
  const context = { config, posts }
  await buildIndex(context)

  await createFeed(context)
}

module.exports = {
  mumimal
}
