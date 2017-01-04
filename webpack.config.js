const merge = require('webpack-merge');
const path = require('path');

const localIdentName = require('./postcss.config.js').generateScopedName;

const conf = {
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
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
      rules: [
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
            { loader: 'css-loader/locals', query: { modules: true, localIdentName, importLoaders: 1 } },
            { loader: 'postcss-loader' },
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
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['latest', 'react'],
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', query: { modules: true, localIdentName, importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
  }),
];
