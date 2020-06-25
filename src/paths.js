const path = require('path')
const { PWD } = process.env

const POSTS_PATH = path.join(PWD, 'posts')

module.exports = {
  POSTS_PATH,
}
