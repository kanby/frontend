import config from './config';
import get from 'lodash/get';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import webpack from 'webpack';

import ManifestPlugin from 'webpack-manifest-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import * as loaders from './loaders';

const cache = {};
const production = process.env.NODE_ENV === 'production';

const pub = '/assets-' + config.get('commit-sha') + '/';

const conf = ({ extend, options }) => {
  const { root } = options;
  const c = merge({
    cache: cache,
    context: path.join(root, 'src'),
    output: {
      filename: '[name].js',
      path: 'dist',
    },
    resolve: {
      alias: {
        client: path.resolve(root, 'src', 'client'),
        components: path.resolve(root, 'src', 'shared', 'components'),
        compositions: path.resolve(root, 'src', 'shared', 'compositions'),
        server: path.resolve(root, 'src', 'server'),
        shared: path.resolve(root, 'src', 'shared'),
        test: path.resolve(root, 'test'),
      },
    },
    module: {
      rules: [
        loaders.babel(options),
      ],
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.COMMIT_SHA': JSON.stringify(config.get('commit-sha')),
      }),
    ],
    devtool: 'source-map'
  }, extend);

  if (production) {
    c.module.rules.unshift({
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(root, 'src'),
        path.resolve(root, 'node_modules')
      ],
      query: {
        presets: ['babili'],
      },
    })
  }

  return c;
};

const configs = root => [
  conf({
    extend: {
      name: 'server',
      entry: {
        server: [ path.join(root, 'src', 'server', 'index.js') ],
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
      },
      root
    }
  }),
  conf({
    extend: {
      name: 'client',
      entry: {
        client: [ path.join(root, 'src', 'client', 'index.js') ],
      },
      output: {
        path: path.join(root, 'dist', pub),
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
      root
    },
  }),
];

export default configs;
