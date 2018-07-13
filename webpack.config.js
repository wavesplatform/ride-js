const path = require('path')
const copy = require('copy-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: '',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new copy([
      { from: 'src/npm-module-wrapper.js', to: 'index.js' },
      { from: 'package.json' },
      { from: 'LICENSE' }
    ]),
  ]
};