const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: require('./webpack.rules'), // eslint-disable-line global-require
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@pastelight': path.join(__dirname, '..', '..', 'src'),
    },
  },
};
