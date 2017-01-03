const conf = require('../webpack.config.js');

require('babel-core/register')({
  plugins: ['babel-plugin-webpack-alias'],
});

require('css-modules-require-hook')({
  generateScopedName: conf.generateScopedName,
});

require('chai').use(require('sinon-chai'));
