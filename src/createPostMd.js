const matter = require('gray-matter');
const { postSrcPath } = require('./paths');
const { writeFile } = require('./file');

/**
 *
 * @param {string} title
 */
function createPostMd(title) {
  const postName = title.replace(/\s+/g, '-').toLocaleLowerCase();
  const postFileName = `${postName}.md`;
  const fileContent = matter.stringify(
    '',
    {
      title,
      tags: '',
    },
  );

  const filePath = postSrcPath(postFileName);

  return writeFile(filePath, fileContent);
}

module.exports = {
  createPostMd,
};
