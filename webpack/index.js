import * as configs from './configs';
import config from './config';
import get from 'lodash/get';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import webpack from 'webpack';

import ManifestPlugin from 'webpack-manifest-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import * as loaders from './loaders';

const root = config.get('root');
const pub = '/assets-' + config.get('commit-sha') + '/';

const conf = ({ extend, options }) => {
  const c = merge(configs.base(options), extend);
  return c;
};

export default [
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
    },
  }),
];
