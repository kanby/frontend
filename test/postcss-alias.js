/*
  This is a temporary place for this plugin to live. I'll eventually extract
  it, test it thoroughly and release it as a npm package.

  Its main purpose is to provide a postcss plugin to support aliasing with the
  same API as webpack. I found the need for it when using
  css-modules-require-hook so I didn't have to compile my tests. I could just
  pass my webpack aliases object and it would resolve them correctly.
*/

const path = require('path');
const postcss = require('postcss');

const matchImport = /^("[^"]*"|'[^']*'|[\w-]+)$/;
const matchValue = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;
const matchCompose = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;

const resolvePath = (aliases, reqPath) => {
  const pair = Object.keys(aliases)
    .map((k) => [k, aliases[k]])
    .find(([alias]) => reqPath.startsWith(alias));

  if (pair) {
    return path.join(pair[1], reqPath.replace(pair[0], ''));
  }

  return reqPath;
};

const plugin = postcss.plugin('postcss-aliases', (opts) => (
  (css) => {
    const aliases = opts || {};

    css.walkAtRules('value', (atRule) => {
      const matches = atRule.params.match(matchValue);
      if (matches) {
        const originalPath = matches[2].replace(/'/g, '').replace(/"/g, '');
        const reqPath = resolvePath(aliases, originalPath);
        const newParams = `${matches[1]} from '${reqPath}'`;
        atRule.replaceWith({ name: 'value', params: newParams });
      }
    });

    css.walkAtRules('import', (atRule) => {
      const matches = atRule.params.match(matchImport);
      if (matches) {
        const originalPath = matches[1].replace(/'/g, '').replace(/"/g, '');
        const reqPath = resolvePath(aliases, originalPath);
        const newParams = `'${reqPath}'`;
        atRule.replaceWith({ name: 'import', params: newParams });
      }
    });

    css.walkDecls('composes', (decl) => {
      const matches = decl.value.match(matchCompose);
      if (matches) {
        const originalPath = matches[2].replace(/'/g, '').replace(/"/g, '');
        const reqPath = resolvePath(aliases, originalPath);
        const newValue = `${matches[1]} from '${reqPath}'`;
        decl.replaceWith({ name: 'composes', value: newValue });
      }
    });
  }
));

module.exports = plugin;
