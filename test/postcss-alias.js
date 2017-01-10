const path = require('path');
const postcss = require('postcss');

const matchImport = /^("[^"]*"|'[^']*'|[\w-]+)$/;
const matchValue = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;
const matchCompose = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;

const resolvePath = (aliases, reqPath) => {
  const pair = Object.entries(aliases).find(([alias]) => reqPath.startsWith(alias));

  if (pair) {
    return path.join(pair[1], reqPath.replace(pair[0], ''));
  }

  return reqPath;
};

const plugin = postcss.plugin('postcss-alises', opts => (
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
