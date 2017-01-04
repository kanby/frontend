const merge = require('webpack-merge');
const path = require('path');
const postcssModules = require('postcss-modules');

const generateScopedName = '[name]-[hash:base64:5]';
const postcssModulesPlugin = postcssModules({ generateScopedName });

const conf = {
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    loaders: [

    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'shared', 'components'),
      compositions: path.resolve(__dirname, 'shared', 'compositions'),
    },
  },
};

module.exports = [
  merge(conf, {
    name: 'server',
    entry: path.join(__dirname, 'server', 'index.js'),
    output: {
      filename: 'server.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['node7', 'react'],
          },
        },
        {
          test: /\.css$/,
          use: [
            'css-loader/locals',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssModulesPlugin,
                ],
              },
            },
          ],
        },
      ],
    },
    target: 'node',
  }),
  merge(conf, {
    name: 'client',
    entry: [path.join(__dirname, 'client', 'index.js')],
    output: {
      filename: 'client.js',
      publicPath: '/assets/',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['node7', 'react'],
          },
        },
        {
          test: /\.css$/,
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssModulesPlugin,
                ],
              },
            },
          ],
        },
      ],
    },
  }),
];

exports.generateScopedName = generateScopedName;
