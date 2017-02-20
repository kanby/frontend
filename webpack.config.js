const get = require('lodash/get');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const cache = {};
const production = process.env.NODE_ENV === 'production';
const sha = require('child_process').execSync('git rev-parse HEAD').toString().trim().substr(0, 5);

const pub = '/assets-' + sha + '/';

const conf = ({ extend, options }) => {
  const c = merge({
    cache: cache,
    context: __dirname,
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
    },
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
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [ path.resolve(__dirname, 'src') ],
          query: {
            env: {
              production: {
                presets: [ 'babili' ],
              },
            },
            presets: [
              ['env', {
                exclude: ['transform-async-to-generator'],
                targets: get(options, 'babel.targets'),
              }],
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
        'process.env.COMMIT_SHA': '"' + sha + '"',
      }),
    ],
    devtool: 'source-map'
  }, extend);

  if (production) {
    c.module.rules.unshift({
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules')
      ],
      query: {
        presets: ['babili'],
      },
    })
  }

  return c;
};

const configs = [
  conf({
    extend: {
      name: 'server',
      entry: {
        server: [ path.join(__dirname, 'src', 'server', 'index.js') ],
      },
      externals: [
        nodeExternals(),
      ],
      node: {
        __dirname: true,
      },
      target: 'node',
    },
    options: {
      babel: {
        targets: { node: true },
      }
    }
  }),
  conf({
    extend: {
      name: 'client',
      entry: {
        client: [ path.join(__dirname, 'src', 'client', 'index.js') ],
      },
      output: {
        path: path.join(__dirname, 'dist', pub),
        publicPath: pub,
      },
      plugins: [
        new webpack.DefinePlugin({
          'config.get(\'environment\')': JSON.stringify(process.env.NODE_ENV),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ],
    },
    options: {
      babel: {
        targets: { browsers: "last 2 versions" },
      },
    },
  }),
];

module.exports = configs;
