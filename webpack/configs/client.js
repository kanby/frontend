import base from './base';
import config from '../config';
import { merge } from '../util';
import path from 'path';
import webpack from 'webpack';

const pub = '/assets-' + config.get('commit-sha') + '/';

export default merge(
  base({
    babel: {
      targets: { browsers: 'last 2 versions' },
    },
  }),
  {
    name: 'client',
    entry: {
      client: [path.join(config.get('root'), 'src', 'client', 'index.js')],
    },
    output: {
      path: path.join(config.get('root'), 'dist', pub),
      publicPath: pub,
    },
    plugins: [
      new webpack.DefinePlugin({
        "config.get('environment')": JSON.stringify(process.env.NODE_ENV),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
);
