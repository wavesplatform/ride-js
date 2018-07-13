const { compile } = require('./bundle')

module.exports = {
  /**
   * @param {string} code
   * @returns {{result: ArrayBuffer, ast: { type:string, value: any }} | {error: string}}
   */
  compile: function (code) {
    return compile(code)
  }
}