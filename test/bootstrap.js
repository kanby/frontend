const config = require('../webpack/configs/server').default;
const register = require('babel-core/register');

const babelOptions = config.module.rules.find(
  l => l.loader === 'babel-loader',
).query;

babelOptions.plugins.push('babel-plugin-webpack-alias');

register(babelOptions);

require('chai').use(require('sinon-chai'));
