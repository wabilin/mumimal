/**
 * @param {Error} error
 * @param {string?} [descMessage]
 */
function die(error, descMessage) {
  console.error(error)
  if (descMessage) {
    console.error(descMessage)
  }

  process.exit(1)
}

module.exports = {
  die
}
