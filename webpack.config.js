const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist/listing');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
    loaders: [
      { exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/ },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
