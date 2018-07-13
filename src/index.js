require('./interop')
const mainnet = require('./mainnet')

module.exports = {
  compile: function (code) {
    return mainnet.compile(code)
  }
}