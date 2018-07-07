const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    ['env', { targets: { electron: '1.6.0' } }],
    'react',
  ],
  plugins: ['react-hot-loader/babel'],
  sourceMaps: 'inline',
});
