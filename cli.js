#!/usr/bin/env node
/* eslint-disable global-require */

const { argv } = require('yargs');
const path = require('path');
const { mumimal } = require('./src/mumimal');
const { createPostMd } = require('./src/createPostMd');

function getConfig(configName) {
  if (!configName) {
    return {};
  }

  const configPath = path.join(process.env.PWD, configName);
  // eslint-disable-next-line import/no-dynamic-require
  const { config } = require(configPath);
  return config;
}

function runMumimal(configName) {
  const config = getConfig(configName);
  return mumimal(config);
}

function mumi() {
  const { config, post } = argv;
  if (post) {
    return createPostMd(post);
  }

  return runMumimal(config);
}

mumi().catch((err) => {
  console.error(err);
  process.exit(1);
});
