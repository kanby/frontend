const postcss = require('../postcss.config.js');
const webpackConfig = require('../webpack.config.js');
const aliasPlugin = require('./postcss-alias');

const babelOptions = Object.assign({}, webpackConfig
  .find(c => c.name === 'server')
  .module.rules.find(l => l.loader === 'babel-loader')
  .query
);

babelOptions.plugins = babelOptions.plugins.concat([
  'babel-plugin-webpack-alias'
]);

require('babel-core/register')(babelOptions);

require('css-modules-require-hook')({
  generateScopedName: postcss.generateScopedName,
  prepend: [aliasPlugin(webpackConfig[0].resolve.alias)],
});

require('chai').use(require('sinon-chai'));
