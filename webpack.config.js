module.exports = [
  {
    name: 'server',
    context: __dirname,
    entry: './server/index.js',
    output: {
      path: `${__dirname}/dist`,
      filename: 'server.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ]
    },
    target: 'node'
  }
];
