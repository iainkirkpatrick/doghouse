const path = require('path')
const fse = require('fs-extra')

module.exports = function (config) {
  const customClientConfigPath = path.resolve(process.cwd(), 'doghouse.client.config.js')
  if (!fse.existsSync(customClientConfigPath)) {
    return config
  } else {
    const modifyConfig = require(customClientConfigPath)
    return modifyConfig(config)
  }
}
