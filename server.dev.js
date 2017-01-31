const Koa = require('koa');
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const connect = require('koa-connect');
const mount = require('koa-mount');

const clientConfig = webpackConfig.find(c => c.name === 'client');
const serverConfig = webpackConfig.find(c => c.name === 'server');

const server = new Koa();
const serverPort = 3000;

const config = Object.assign({}, clientConfig, {
  entry: Object.assign({}, clientConfig.entry, {
    client: ['webpack-hot-middleware/client'].concat(clientConfig.entry.client),
  }),
  plugins: clientConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),
});

const clientCompiler = webpack(config);

const devMiddleware = connect(webpackDevMiddleware(clientCompiler, {
    noInfo: true,
    quiet: true,
    publicPath: clientConfig.output.publicPath,
  }));

const hotMiddleware = connect(webpackHotMiddleware(clientCompiler));

server.use((ctx, next) => {
  ctx.res.statusCode = 200;
  return next();
});

server.use(devMiddleware);

server.use((ctx, next) => {
  ctx.res.statusCode = null;

  return next();
});

server.use(hotMiddleware);
server.listen(serverPort);

const serverCompiler = webpack(Object.assign({}, serverConfig, {
    entry: { server: path.join(__dirname, 'src', 'server', 'server.js') },
    output: Object.assign({}, serverConfig.output, {
      libraryTarget: 'commonjs2',
    }),
  }));

const serverFile = path.join(
  serverConfig.output.path,
  serverConfig.output.filename.replace('[name]', 'server')
);

let serverMiddleware;

const handleError = err =>
  console.log(chalk.white(chalk.red('COMPILER ERROR:'), err));

const handleWarning = warning =>
  console.log(chalk.white(chalk.red('COMPILER WARNING:'), warning));

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  if (stats.hasErrors()) return stats.toJson().errors.forEach(handleError);
  if (stats.hasWarnings()) stats.toJson().warnings.forEach(handleWarning);

  const i = server.middleware.indexOf(serverMiddleware);
  const exists = i !== -1;

  if (exists) {
    console.log(chalk.white(chalk.yellow('INFO:'), 'Server reloading.'));
    delete require.cache[serverFile];
    server.middleware.splice(i, 1);
  }

  serverMiddleware = mount(require(serverFile).default);

  server.use(serverMiddleware);

  if (exists)
    return console.log(chalk.white(chalk.yellow('INFO:'), 'Server reloaded.'));

  return console.log(chalk.white(chalk.yellow('INFO:'), 'Server loaded.'));
});
