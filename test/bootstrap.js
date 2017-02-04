const webpackConfig = require('../webpack.config.js');

const babelOptions = Object.assign({}, webpackConfig
  .find(c => c.name === 'server')
  .module.rules.find(l => l.loader === 'babel-loader')
  .query
);

babelOptions.plugins = babelOptions.plugins.concat([
  'babel-plugin-webpack-alias'
]);

require('babel-core/register')(babelOptions);

require('chai').use(require('sinon-chai'));
