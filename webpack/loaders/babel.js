import config from '../config';
import get from 'lodash/get';
import path from 'path';

const babelLoader = (options = {}) => ({
  test: /\.js$/,
  loader: 'babel-loader',
  include: [ path.resolve(config.get('root'), 'src') ],
  query: {
    env: {
      production: {
        presets: [ 'babili' ],
      },
    },
    presets: [
      ['env', {
        exclude: ['transform-async-to-generator'],
        targets: get(options, 'babel.targets', { node: true }),
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
});

export default babelLoader;
