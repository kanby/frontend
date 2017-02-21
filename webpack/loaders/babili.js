import config from '../config';
import path from 'path';

export default options => ({
  test: /\.js$/,
  loader: 'babel-loader',
  include: [path.resolve(config.get('root'), 'node_modules')],
  query: {
    presets: ['babili'],
  },
});
