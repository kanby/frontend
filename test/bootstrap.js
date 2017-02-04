const postcss = require('../postcss.config.js');
const webpackConfig = require('../webpack.config.js');
const aliasPlugin = require('./postcss-alias');

require('babel-core/register')({
  presets: ['node7', 'react'],
  plugins: [
    'async-to-promises',
    'transform-class-properties',
    'transform-flow-strip-types',
    'webpack-alias',
  ],
});

require('css-modules-require-hook')({
  generateScopedName: postcss.generateScopedName,
  prepend: [aliasPlugin(webpackConfig[0].resolve.alias)],
});

require('chai').use(require('sinon-chai'));
