const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const conf = {
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      components: 'shared/components',
      compositions: 'shared/compositions',
      shared: path.resolve(__dirname, 'shared'),
    },
  },
  plugins: [],
  devtool: 'source-map',
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
            presets: ['node7'],
            plugins: ['inferno'],
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'css-loader/locals', query: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    externals: [nodeExternals()],
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
            presets: ['latest'],
            plugins: ['inferno'],
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', query: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  }),
];
