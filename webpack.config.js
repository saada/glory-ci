const { resolve } = require('path')

module.exports = {
  context: resolve(__dirname, 'js'),

  entry: [
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'static/dist')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
