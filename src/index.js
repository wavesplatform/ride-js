require('./interop')
const mainnet = require('../../Waves/lang/js/target/lang-opt')

module.exports = {
  compile: function (code) {
    return mainnet.compile(code)
  }
}