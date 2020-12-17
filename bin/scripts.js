#!/usr/bin/env node
const path = require('path')
const { start, build } = require('../dist/src').default

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const cwd = process.cwd()
const operator = argv._[0]

const { mode } = argv

switch (operator) {
  case 'start':
    start(getMatchaConfig({ cwd, mode }))
    break
  case 'build':
    build(getMatchaConfig({ cwd, mode }))
    break
  default:
    console.log('err')
    break
}

function getMatchaConfig ({ cwd, mode }) {
  const config = require(path.resolve(cwd, 'matcha.config'))
  if (mode) {
    Object.assign(config, { mode })
  }
  console.log(config)
  return config
}
