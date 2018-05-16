const path = require('path')
const webpack = require('webpack')
const fse = require('fs-extra')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = function (opts) {
  const { MODE, HOST, PORT, BUILD_DIR } = opts
  var config = {
    target: 'node',
    mode: MODE,
    context: process.cwd(),
    entry: [
      './index.js'
    ],
    devtool: 'inline-source-map',
    node: {
      __console: false,
      __dirname: false,
      __filename: false
    },
    externals: [
      nodeExternals({
        whitelist: [
          MODE === 'development' ? 'webpack/hot/poll?300' : null
        ].filter(x => x)
      }),
    ],
    plugins: MODE === 'development' ? [
      new webpack.HotModuleReplacementPlugin(),
      new StartServerPlugin({ name: 'server.js' })
    ] : [],
    resolve: {
      modules: [
        "node_modules"
      ],
      alias: {
        'webpack/hot/poll': require.resolve('webpack/hot/poll')
      }
    },
    output: {
      filename: 'server.js',
      path: path.resolve(process.cwd(), BUILD_DIR),
      publicPath: MODE === 'development' ? `http://${HOST}:${PORT}/` : '/',
      libraryTarget: 'commonjs2'
    },
    watch: MODE === 'development' ? true : false
  }

  if (MODE === 'development') {
    config.entry.unshift('webpack/hot/poll?300')
  }

  return config
}
