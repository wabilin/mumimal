#!/usr/bin/env node

const { Mumimal } = require('./src/Mumimal')

async function mumi() {
  const mumimal = new Mumimal({})
  return mumimal.run()
}

mumi()
