const { STATIC_PATH, DIST_PATH } = require('./paths')
const { copyRecursive } = require('./file')

function copyStatic() {
  return copyRecursive(`${STATIC_PATH}/`, `${DIST_PATH}/`)
}

module.exports = {
  copyStatic
}
