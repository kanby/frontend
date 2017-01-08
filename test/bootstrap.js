const postcss = require('../postcss.config.js');

require('babel-core/register')({
  presets: ['latest'],
  plugins: [
    'babel-plugin-webpack-alias',
    'inferno',
  ],
});

require('css-modules-require-hook')({
  generateScopedName: postcss.generateScopedName,
});

require('chai').use(require('sinon-chai'));
