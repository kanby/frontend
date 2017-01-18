const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const conf = {
  context: __dirname,
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'shared', 'components'),
      compositions: path.resolve(__dirname, 'src', 'shared', 'compositions'),
      shared: path.resolve(__dirname, 'src', 'shared'),
      test: path.resolve(__dirname, 'test'),
    },
  },
  plugins: [],
  devtool: 'source-map',
};

const configs = [
  merge(conf, {
    name: 'server',
    entry: path.join(__dirname, 'src', 'server', 'index.js'),
    output: {
      filename: 'server.js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['node7'],
            plugins: ['inferno', 'transform-flow-strip-types'],
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'css-loader/locals', query: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    node: {
      __dirname: true,
    },
    externals: [nodeExternals()],
    target: 'node',
  }),
  merge(conf, {
    name: 'client',
    entry: [path.join(__dirname, 'src', 'client', 'index.js')],
    output: {
      filename: 'client.js',
      publicPath: '/assets/',
      path: path.join(__dirname, 'dist', 'assets'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['latest'],
            plugins: ['inferno', 'transform-flow-strip-types'],
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', query: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
  }),
];

if (process.env.NODE_ENV === 'production') {
  configs[1].plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = configs;
