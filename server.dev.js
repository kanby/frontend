/* eslint no-console:0,import/no-dynamic-require:0,global-require:0,no-param-reassign:0 */

const Koa = require('koa');
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const connect = require('koa-connect');
const mount = require('koa-mount');

const clientConfig = webpackConfig.find(c => c.name === 'client');
const serverConfig = webpackConfig.find(c => c.name === 'server');

const server = new Koa();
const serverPort = 3000;

const mergedConfig = merge.smart(clientConfig, {
  entry: ['webpack-hot-middleware/client'],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: clientConfig.module.loaders.find(l => l.loader === 'babel-loader').query.presets.concat('react-hmre'),
        },
      },
    ],
  },
});

console.log(mergedConfig.module.loaders);

const clientCompiler = webpack(mergedConfig);

const devMiddleware = connect(webpackDevMiddleware(clientCompiler, {
  noInfo: false,
  quiet: false,
  publicPath: clientConfig.output.publicPath,
}));

const hotMiddleware = connect(webpackHotMiddleware(clientCompiler));

server.use((ctx, next) => {
  ctx.res.statusCode = 200;
  return next();
});

server.use(devMiddleware);

server.use((ctx, next) => {
  ctx.res.statusCode = undefined;
  return next();
});

server.use(hotMiddleware);
server.listen(serverPort);

const serverCompiler = webpack(merge(serverConfig, {
  entry: path.join(__dirname, 'server', 'server.js'),
  output: {
    libraryTarget: 'commonjs2',
  },
}));

const serverFile = path.join(serverConfig.output.path, serverConfig.output.filename);

let serverMiddleware;

serverCompiler.watch({}, (err) => {
  if (err) {
    throw (err);
  }

  const i = server.middleware.findIndex(mw => mw === serverMiddleware);
  const exists = (i !== -1);

  if (exists) {
    console.log(chalk.white(chalk.yellow('INFO:'), 'Server reloading.'));
    delete require.cache[serverFile];
  }

  serverMiddleware = mount(require(serverFile).default);

  if (exists) {
    server.middleware.splice(i, 1);
  }

  server.use(serverMiddleware);

  if (exists) {
    console.log(chalk.white(chalk.yellow('INFO:'), 'Server reloaded.'));
  } else {
    console.log(chalk.white(chalk.yellow('INFO:'), 'Server loaded.'));
  }
});
