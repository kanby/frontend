const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const conf = {
  context: __dirname,
  resolve: {
    alias: {
      client: path.resolve(__dirname, 'src', 'client'),
      components: path.resolve(__dirname, 'src', 'shared', 'components'),
      compositions: path.resolve(__dirname, 'src', 'shared', 'compositions'),
      server: path.resolve(__dirname, 'src', 'server'),
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
            // ExtractTextPlugin injected here when NODE_ENV === 'production'
            // style-loader injected here when NODE_ENV !== 'production'
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

const clientCssLoader = configs[1].module.rules.find((l) => l.test.test('.css'));

if (process.env.NODE_ENV === 'production') {
  configs[1].plugins.push(new webpack.optimize.UglifyJsPlugin());
  configs[1].plugins.push(new ExtractTextPlugin('styles-[contenthash:5].css'));
  clientCssLoader.loader = ExtractTextPlugin.extract(clientCssLoader.use.concat([]));
  delete clientCssLoader.use;
} else {
  clientCssLoader.use.unshift({ loader: 'style-loader' });
}

module.exports = configs;
