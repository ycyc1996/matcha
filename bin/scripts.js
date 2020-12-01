#!/usr/bin/env node
const path = require('path')
const { start } = require('../dist/src').default

const cwd = process.cwd()
const args = process.argv.slice(2)

console.log(args)

if (args.length > 0) {
  const action = args[0]

  switch (action) {
    case 'start':
      commandStart(args)
      break
    case 'build':
      commandBuild(args)
      break
    case 'help':
      break
    default:
      break
  }
}

function commandStart (args) {
  console.info('start matcha app')
  const config = require(path.resolve(cwd, 'matcha.config'))
  start(config)
}

function commandBuild (args) {
  console.info('build matcha app')
}
