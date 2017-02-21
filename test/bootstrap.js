const register = require('babel-core/register');
const config = require('../webpack/configs/server').default;

const isBabelLoader = l => l.loader === 'babel-loader';
const babelOptions = config.module.rules.find(isBabelLoader).query;
babelOptions.plugins.push('babel-plugin-webpack-alias');
register(babelOptions);

require('chai').use(require('sinon-chai'));
