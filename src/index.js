require('./interop')
const mainnet = require('./mainnet')

module.exports = {
  compile: function (code) {
    if (typeof code !== 'string'){
      return {
        error: 'Type error: contract should be string'
      }
    }
    return mainnet.compile(code)
  }
}