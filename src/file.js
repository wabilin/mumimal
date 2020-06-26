const fs = require('fs')
const { exec } = require("child_process");

/**
 * @param {string} filePath
 * @returns {Promise<string>}
 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * @param {string} filePath
 */
function readFileSync(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf-8' })
}

/**
 * @param {string} filePath
 * @param {string} content
 * @returns {Promise<void>}
 */
function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    });
  })
}


/**
 * @param {string} dirPath
 * @returns {Promise<string[]>}
 */
function readDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, function (err, files) {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    });
  })
}

/**
 * @param {string} dirPath
 * @returns {Promise<void>}
 */
function mkdir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve()
      }
    });
  })
}

/**
 * @param {string} src
 * @param {string} dist
 */
function copyRecursive(src, dist) {
  return new Promise((resolve, reject) => {
    exec(`cp -r ${src} ${dist}`, (error, stdout, stderr) => {
      if (error) {
        return reject(error)
      }

      if (stderr) {
        return reject(stderr);
      }

      if (!error && ! stderr) {
        resolve(stdout)
      }
    });
  })
};

module.exports = {
  copyRecursive,
  readFile,
  readFileSync,
  writeFile,
  readDir,
  mkdir,
}
