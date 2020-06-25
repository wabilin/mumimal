#!/usr/bin/env node

const { parsePosts } = require('./src/parsePosts')

async function mumi() {
  return parsePosts()
}

mumi()
