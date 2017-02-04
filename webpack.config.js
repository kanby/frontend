const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ManifestPlugin = require('webpack-manifest-plugin');

const sha = require('child_process').execSync('git rev-parse HEAD').toString().trim().substr(0, 5);
const production = process.env.NODE_ENV === 'production';
const manifestCache = {};

const conf = {
  context: __dirname,
  resolve: {
    alias: {
      client: path.resolve(__dirname, 'src', 'client'),
      components: path.resolve(__dirname, 'src', 'shared', 'components'),
      compositions: path.resolve(__dirname, 'src', 'shared', 'compositions'),
      server: path.resolve(__dirname, 'src', 'server'),
      shared: path.resolve(__dirname, 'src', 'shared'),
      test: path.resolve(__dirname, 'test'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COMMIT_SHA': '"' + sha + '"',
    }),
  ],
  devtool: 'source-map'
};

const publicPath = '/assets-' + sha + '/';

const configs = [merge(conf, {
    name: 'server',
    entry: {
      server: path.join(__dirname, 'src', 'server', 'index.js'),
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['env', { exclude: ['transform-async-to-generator'], targets: { browsers: "last 2 versions" } }],
              'react'
            ],
            plugins: [
              ['fast-async', { useRuntimeModule: true }],
              'transform-object-rest-spread',
              'transform-class-properties',
              'transform-flow-strip-types',
            ],
          },
        },
      ],
    },
    node: {
      __dirname: true,
    },
    externals: [nodeExternals()],
    target: 'node',
  }), merge(conf, {
    name: 'client',
    entry: {
      client: path.join(__dirname, 'src', 'client', 'index.js'),
    },
    output: {
      filename: '[name].js',
      publicPath,
      path: path.join(__dirname, 'dist', publicPath),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['env', { exclude: ['transform-async-to-generator'], targets: { node: true } }],
              'react'
            ],
            plugins: [
              ['fast-async', { useRuntimeModule: true }],
              'transform-object-rest-spread',
              'transform-class-properties',
              'transform-flow-strip-types',
            ],
          },
        },
      ],
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'config.get(\'environment\')': JSON.stringify(process.env.NODE_ENV),
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
  })];

if (production) {
  configs[1].module.rules
    .find(l => l.loader === 'babel-loader')
    .query.presets.push('babili');
}

module.exports = configs;
