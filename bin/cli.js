#!/usr/bin/env node

var cliclopts = require('cliclopts')
var minimist = require('minimist')
var util = require('util')

var main = require('../')

var opts = cliclopts([
  {
    name: 'app',
    abbr: 'a',
    boolean: true,
    default: false
  },
  {
    name: 'directory',
    abbr: 'd',
    default: process.cwd()
  },
  {
    name: 'name',
    abbr: 'n',
    default: ''
  }
])

var argv = minimist(process.argv.slice(2), opts.options())

var errorCb = function (err) {
  if (err) {
    process.stderr.write(util.format(err))
    process.stderr.write('\n')
  }
}

if (argv.app) {
  main.createApp(argv, errorCb)
} else {
  main.createConcept(argv, errorCb)
}
