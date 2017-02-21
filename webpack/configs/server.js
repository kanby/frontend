import config from '../config';
import nodeExternals from 'webpack-node-externals';
import path from 'path';

export default () => ({
  name: 'server',
  entry: {
    server: [ path.join(config.get('root'), 'src', 'server', 'index.js') ],
  },
  externals: [
    nodeExternals(),
  ],
  node: {
    __dirname: true,
  },
  target: 'node',
});
