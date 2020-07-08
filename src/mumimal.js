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

  const timeStart = Date.now()
  console.log('mumimal started')

  await copyStatic()
  const posts = await parsePosts()

  const paredPostsDone = Date.now()
  console.log(`${posts.length} posts created (${paredPostsDone - timeStart} ms)`)

  /** @type {Context} */
  const context = {
    config,
    posts
  }
  await buildIndex(context)

  const indexDone = Date.now()
  console.log(`index created (${indexDone - paredPostsDone} ms)`)

  await createFeed(context)

  const feedDone = Date.now()
  console.log(`feed created (${feedDone - indexDone} ms)`)
}

module.exports = {
  mumimal
}
