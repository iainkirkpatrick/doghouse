#! /usr/bin/env node

process.env.NODE_ENV = 'production'
const fse = require('fs-extra')
const webpack = require('webpack')
const createClientConfig = require('../createClientConfig')
const createServerConfig = require('../createServerConfig')
const customClientConfig = require('../util/customClientConfig')
const customServerConfig = require('../util/customServerConfig')
const getEnvConfig = require('../util/getEnvConfig')

module.exports = {
  command: 'build',
  description: 'build your app in production mode',
  handler: (argv) => {
    // TODO: accept args for customisation
    const envConfig = getEnvConfig()

    const clientConfig = customClientConfig(createClientConfig(envConfig))
    const serverConfig = customServerConfig(createServerConfig(envConfig))

    console.log('starting compiling...')

    fse.emptyDir(envConfig.BUILD_DIR, (err) => {
      if (err) return console.error(err)
      console.log('cleaned build dir')

      build((err) => {
        if (err) {
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
          return
        }

        console.log('finished compiling!')
      })
    })

    function build (cb) {
      console.log('client compiling...')
      compile(clientConfig, (err, clientStats) => {
        if (err) {
          return cb(err)
        }

        const clientInfo = clientStats.toJson()
        if (clientStats.hasErrors()) { return cb(clientInfo.errors) }
        if (clientStats.hasWarnings()) { console.warn(clientInfo.warnings) }

        console.log('server compiling...')
        compile(serverConfig, (err, serverStats) => {
          if (err) {
            return cb(err)
          }

          const serverInfo = serverStats.toJson()
          if (serverStats.hasErrors()) { return cb(serverInfo.errors) }
          if (serverStats.hasWarnings()) { console.warn(serverInfo.warnings) }

          return cb(null)
        })
      })
    }
  }
}

// Wrap webpack compile in a try catch.
function compile(config, cb) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors('Failed to compile.', [e]);
    process.exit(1);
  }
  compiler.run((err, stats) => {
    cb(err, stats);
  });
}
