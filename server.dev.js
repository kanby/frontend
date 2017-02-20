const Koa = require('koa');
const chalk = require('chalk');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const connect = require('koa-connect');
const mount = require('koa-mount');

const server = new Koa();
const serverPort = 3000;

const built = { client: false, server: false };

const clientConfig = merge(webpackConfig.find(c => c.name === 'client'), {
  entry: {
    client: ['webpack-hot-middleware/client'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

const clientCompiler = webpack(clientConfig);

const devMiddleware = connect(webpackDevMiddleware(clientCompiler, {
    stats: 'minimal',
    publicPath: clientConfig.output.publicPath,
  }));

const hotMiddleware = connect(webpackHotMiddleware(clientCompiler));

const waitForBuild = (done) => {
  if (built.client && built.server) {
    done();
  }

  setTimeout(() => waitForBuild(done), 200);
}

server.use((ctx, next) => {
  return new Promise((res, rej) => {
    waitForBuild(res);
  }).then(next);
});

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

const serverConfig = merge(webpackConfig.find(c => c.name === 'server'), {
    entry: {
      server: path.join(__dirname, 'src', 'server', 'server.js'),
    },
    output: {
      libraryTarget: 'commonjs2',
    },
  });

const serverCompiler = webpack(serverConfig);

const serverFile = path.join(
  serverConfig.output.path,
  serverConfig.output.filename.replace('[name]', serverConfig.name)
);

let serverMiddleware;

const handleError = err =>
  console.log(chalk.white(chalk.red('COMPILER ERROR:'), err));

const handleWarning = warning =>
  console.log(chalk.white(chalk.red('COMPILER WARNING:'), warning));

clientCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  if (stats.hasErrors()) return stats.toJson().errors.forEach(handleError);
  if (stats.hasWarnings()) stats.toJson().warnings.forEach(handleWarning);

  built.client = true;

  return console.log(chalk.white(chalk.yellow('INFO:'), 'Client bundle compiled.'));
});

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

  built.server = true;

  if (exists)
    return console.log(chalk.white(chalk.yellow('INFO:'), 'Server reloaded.'));

  return console.log(chalk.white(chalk.yellow('INFO:'), 'Server loaded.'));
});
