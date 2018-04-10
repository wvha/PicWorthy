const path = require('path');
const SRC_DIR = path.join(__dirname, './client');
const DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  entry: `${DIST_DIR}/index.html`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    test: /\.jsx$/,
    loader: 'babel-loader',
    include: SRC_DIR,
    query: {
      presets: ['react', 'es2015']
    }
  }
};