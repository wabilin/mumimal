// @ts-check

const ejs = require('ejs');

const { minify } = require('html-minifier-terser');
const { INDEX_LAYOUT_PATH, DIST_INDEX_PATH } = require('./paths');
const { writeFile } = require('./file');

function buildIndex(context) {
  const { config, posts } = context;

  const { site, ejsOption, build } = config;

  const data = {
    site,
    posts,
  };

  return new Promise((resolve, reject) => {
    ejs.renderFile(INDEX_LAYOUT_PATH, data, ejsOption, (err, content) => {
      if (err) {
        return reject(err);
      }

      const distContent = build.minify
        ? minify(content, build.minifyOption)
        : content;

      return writeFile(DIST_INDEX_PATH, distContent).then(resolve);
    });
  });
}

module.exports = {
  buildIndex,
};
