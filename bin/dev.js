#! /usr/bin/env node

process.env.NODE_ENV = 'development'
const webpack = require('webpack')
const createClientConfig = require('../createClientConfig')
const createServerConfig = require('../createServerConfig')
const customClientConfig = require('../util/customClientConfig')
const customServerConfig = require('../util/customServerConfig')
const devServer = require('webpack-dev-server')
const getEnvConfig = require('../util/getEnvConfig')

module.exports = {
  command: 'dev',
  description: 'start your app in development mode',
  handler: (argv) => {
    // TODO: accept args for customisation
    const envConfig = getEnvConfig()

    const clientConfig = customClientConfig(createClientConfig(envConfig))
    const serverConfig = customServerConfig(createServerConfig(envConfig))

    devServer.addDevServerEntrypoints(clientConfig, clientConfig.devServer)

    console.log('starting compiling...')

    const clientCompiler = compile(clientConfig)
    const serverCompiler = compile(serverConfig)

    clientCompiler.plugin('done', () => {
      serverCompiler.watch(
        {
          quiet: true,
          stats: 'none',
        },
        stats => {}
      )
    })

    const clientDevServer = new devServer(clientCompiler, clientConfig.devServer)

    clientDevServer.listen(
      envConfig.DEV_SERVER_PORT,
      err => {
        if (err) {
          console.error(err)
        }
      }
    )

  }
}

// Webpack compile in a try-catch
function compile(config) {
  let compiler
  try {
    compiler = webpack(config)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
  return compiler
}
