const postcssModules = require('postcss-modules');

module.exports = [
  {
    name: 'server',
    context: __dirname,
    entry: './server/index.js',
    output: {
      path: `${__dirname}/dist`,
      filename: 'server.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'css-loader/locals',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssModules,
                ],
              },
            },
          ],
        },
      ],
    },
    target: 'node',
  },
  {
    name: 'client',
    context: __dirname,
    entry: './client/index.js',
    output: {
      path: `${__dirname}/dist`,
      filename: '[hash:5]-client.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssModules,
                ],
              },
            },
          ],
        },
      ],
    },
  },
];
