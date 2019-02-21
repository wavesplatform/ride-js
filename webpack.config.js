const path = require('path')
const copy = require('copy-webpack-plugin')


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
    // new copy([
    //   { from: 'src/index.d.ts', to: 'index.d.ts' },
    //   { from: 'package.json' },
    //   { from: 'LICENSE' }
    // ]),
  ]
};