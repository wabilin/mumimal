#!/usr/bin/env node

const { mumimal } = require('./src/mumimal')

async function mumi() {
  return mumimal()
}

mumi().catch(err => console.log(err))
