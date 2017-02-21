import base from './base';
import config from '../config';
import nodeExternals from 'webpack-node-externals';
import { merge } from '../util';
import path from 'path';

export default merge(
  base({
    babel: {
      targets: { node: true },
    },
  }),
  {
    name: 'server',
    entry: {
      server: [path.join(config.get('root'), 'src', 'server', 'index.js')],
    },
    externals: [nodeExternals()],
    node: {
      __dirname: true,
    },
    target: 'node',
  },
);
