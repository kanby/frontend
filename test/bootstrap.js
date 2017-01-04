const postcss = require('../postcss.config.js');

require('babel-core/register')({
  plugins: ['babel-plugin-webpack-alias'],
});

require('css-modules-require-hook')({
  generateScopedName: postcss.generateScopedName,
});

require('chai').use(require('sinon-chai'));
