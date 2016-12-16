module.exports = {
  context: __dirname,
  entry: './server/index.js',
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['node7']
        }
      }
    ]
  }
};
