const path = require('path')
const webpack = require('webpack')

module.exports = function (opts) {
  const { MODE, HOST, PORT, DEV_SERVER_PORT, PUBLIC_DIR } = opts
  var config = {
    target: 'web',
    mode: MODE,
    context: process.cwd(),
    entry: [
      './client.js'
    ],
    devtool: 'inline-source-map',
    plugins: MODE === 'development' ? [
       new webpack.HotModuleReplacementPlugin()
    ] : [],
    resolve: {
      modules: [
        "node_modules"
      ],
      alias: {
        'webpack/hot/dev-server': require.resolve('webpack/hot/dev-server')
      }
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(process.cwd(), PUBLIC_DIR),
      publicPath: MODE === 'development' ? `http://${HOST}:${DEV_SERVER_PORT}/` : '/'
    }
  }

  if (MODE === 'development') {
    config.devServer = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      hot: true,
      host: HOST,
      port: DEV_SERVER_PORT,
      publicPath: `http://${HOST}:${DEV_SERVER_PORT}/`,
      noInfo: true
    }
  }

  return config
}
