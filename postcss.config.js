const modulesLocalByDefault = require('postcss-modules-local-by-default');
const modulesExtractImports = require('postcss-modules-extract-imports');
const modulesScope = require('postcss-modules-scope');
const modulesValues = require('postcss-modules-values');
const cssNext = require('postcss-cssnext');
const createHash = require('crypto').createHash;

const generateScopedName = (name, fpath) =>
  `${name}-${createHash('md5').update(fpath).digest('base64').slice(0, 5)}`;

module.exports = {
  plugins: [
    modulesValues,
    modulesLocalByDefault,
    modulesExtractImports,
    modulesScope({ generateScopedName }),
    cssNext,
  ],
  generateScopedName,
};
