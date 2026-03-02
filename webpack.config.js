const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ride.min.js',
    library: 'RideJS',
    //libraryTarget: 'commonjs'
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};
