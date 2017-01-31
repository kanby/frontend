const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const production = process.env.NODE_ENV === 'production';

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
  devtool: production ? 'eval' : 'source-map',
};

const publicPath = '/assets/';

const configs = [merge(conf, {
    name: 'server',
    entry: {
      server: path.join(__dirname, 'src', 'server', 'index.js'),
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['node7'],
            plugins: [
              'async-to-promises',
              'inferno',
              'transform-flow-strip-types',
            ],
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
  }), merge(conf, {
    name: 'client',
    entry: {
      client: path.join(__dirname, 'src', 'client', 'index.js'),
    },
    output: {
      filename: production ? '[name]-[hash:5].js' : '[name].js',
      publicPath,
      path: path.join(__dirname, 'dist', 'assets'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['latest'],
            plugins: [
              'async-to-promises',
              'inferno',
              'transform-flow-strip-types',
            ],
          },
        },
        {
          test: /\.css$/,
          use: [
            // ExtractTextPlugin injected here when NODE_ENV === 'production'
            // style-loader injected here when NODE_ENV !== 'production'
            {
              loader: 'css-loader',
              query: {
                importLoaders: 1,
                sourceMap: !production,
                minimize: production,
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new ManifestPlugin({
        fileName: '../manifest.json',
        publicPath,
        writeToFileEmit: true,
      }),
    ],
  })];

const clientCssLoader = configs[1].module.rules.find(l => l.test.test('.css'));

if (production) {
  configs[1].plugins.push(new webpack.optimize.UglifyJsPlugin());
  configs[1].plugins.push(new ExtractTextPlugin('styles-[contenthash:5].css'));
  clientCssLoader.loader = ExtractTextPlugin.extract(
    clientCssLoader.use.concat([]),
  );
  delete clientCssLoader.use;
} else {
  clientCssLoader.use.unshift({ loader: 'style-loader' });
}

module.exports = configs;
