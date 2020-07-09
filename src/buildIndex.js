//@ts-check

const ejs = require('ejs')

const { INDEX_LAYOUT_PATH, DIST_INDEX_PATH } = require('./paths')
const { writeFile } = require('./file')
const { minify } = require('html-minifier-terser')

function buildIndex(context) {
  const { config, posts } = context

  const { site, ejsOption } = config

  const data = {
    site,
    posts,
  }

  return new Promise((resolve, reject) => {
    ejs.renderFile(INDEX_LAYOUT_PATH, data, ejsOption, function(err, content){
      if (err) {
        return reject(err)
      }

      if (config.build.minify) {
        content = minify(content, config.build.minifyOption)
      }

      return writeFile(DIST_INDEX_PATH, content).then(resolve)
    });
  })
}

module.exports = {
  buildIndex
}
