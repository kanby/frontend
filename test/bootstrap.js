const postcss = require('../postcss.config.js');
const webpackConfig = require('../webpack.config.js');
const aliasPlugin = require('./postcss-alias');

require('babel-core/register')({
  presets: ['latest'],
  plugins: [
    'babel-plugin-webpack-alias',
    'babel-plugin-inferno',
    'babel-plugin-transform-flow-strip-types',
  ],
});

require('css-modules-require-hook')({
  generateScopedName: postcss.generateScopedName,
  prepend: [
    aliasPlugin(webpackConfig[0].resolve.alias),
  ],
});

require('chai').use(require('sinon-chai'));
