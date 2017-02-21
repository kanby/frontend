import config from '../config';
import path from 'path';
import webpack from 'webpack';

const pub = '/assets-' + config.get('commit-sha') + '/';

export default () => ({
  name: 'client',
  entry: {
    client: [ path.join(config.get('root'), 'src', 'client', 'index.js') ],
  },
  output: {
    path: path.join(config.get('root'), 'dist', pub),
    publicPath: pub,
  },
  plugins: [
    new webpack.DefinePlugin({
      'config.get(\'environment\')': JSON.stringify(process.env.NODE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
});
