import path from 'path';
import webpack from 'webpack';

import config from '../config';
import { env } from '../util';
import * as loaders from '../loaders';

const cache = {};

export default options => ({
  cache: cache,
  context: config.get('root'),
  output: {
    filename: '[name].js',
    path: 'dist',
  },
  resolve: {
    alias: {
      client: path.resolve(config.get('root'), 'src', 'client'),
      components: path.resolve(
        config.get('root'),
        'src',
        'shared',
        'components',
      ),
      compositions: path.resolve(
        config.get('root'),
        'src',
        'shared',
        'compositions',
      ),
      server: path.resolve(config.get('root'), 'src', 'server'),
      shared: path.resolve(config.get('root'), 'src', 'shared'),
      test: path.resolve(config.get('root'), 'test'),
    },
  },
  module: {
    rules: [
      loaders.babel(options),
      env('production', loaders.babili(options), {}),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COMMIT_SHA': JSON.stringify(config.get('commit-sha')),
    }),
  ],
  devtool: 'source-map',
});
