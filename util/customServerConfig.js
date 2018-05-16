const path = require('path')
const fse = require('fs-extra')

module.exports = function (config) {
  const customServerConfigPath = path.resolve(process.cwd(), 'doghouse.server.config.js')
  if (!fse.existsSync(customServerConfigPath)) {
    return config
  } else {
    const modifyConfig = require(customServerConfigPath)
    return modifyConfig(config)
  }
}
