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
  },
  build: {
    minify: process.env.NODE_ENV === 'production',
    minifyOption: {
      html5: true,
      collapseWhitespace: true,
      minifyJS: true,
      removeAttributeQuotes: true,
    },
    copyStatic: true,
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
 * @typedef {Object} Build
 * @property {boolean} [minify]
 * @property {Object} [minifyOption]
 * @property {boolean} [copyStatic]
 */

/**
 * @typedef {Object} Config
 * @property {Site} site
 * @property {Feed} feed
 * @property {Object} [ejsOption]
 * @property {Object} [build]
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
    build = {},
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
     build: {
       ...DEFAULT_CONFIG.build,
       ...build,
     },
   }
}

/**
 * @typedef {Object} Context
 * @property {Config} config
 * @property {PostMeta[]} posts
 */

 /**
  * @param {Partial<Config>} userConfig
  */
async function mumimal(userConfig = {}) {
  const config = mergeConfig(userConfig)

  if (config.build.copyStatic) {
    await copyStatic()
  }
  const posts = await parsePosts(config)

  /** @type {Context} */
  const context = { config, posts }
  await buildIndex(context)

  await createFeed(context)
}

module.exports = {
  mumimal
}
