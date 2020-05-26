const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/index.js',

  target: 'node',

  // externals: [nodeExternals()],
  externals: 'node_modules',

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['isomorphic-style-loader', 'css-loader']
      },
      {
        test: /\.jsx/,
        use: 'babel-loader'
      }
    ]
  }
};