const cssnext = require('postcss-cssnext');

const generateScopedName = '[local]-[hash:base64:5]';

module.exports = {
  plugins: [
    cssnext,
  ],
  generateScopedName,
};
