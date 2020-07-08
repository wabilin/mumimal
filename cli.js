#!/usr/bin/env node

const { argv } = require('yargs')
const path = require('path')
const { mumimal } = require('./src/mumimal')

function getConfig() {
  const configName = argv.config
  if (!configName) {
    return {}
  }

  const configPath = path.join(process.env.PWD, configName)
  const { config } = require(configPath)
  return config
}

function mumi() {
  const config = getConfig()
  return mumimal(config)
}

mumi().catch(err => {
  console.log(err)
  process.exit(1)
})
