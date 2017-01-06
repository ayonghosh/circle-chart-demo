var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    js: [ './src/index' ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  watch: true,
  target: 'web',
  devServer: {
    contentBase: '.',
    inline: true,
    port: 2222
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react')
          ],
          plugins: [
            require.resolve('babel-plugin-react-html-attrs'),
            require.resolve('babel-plugin-transform-class-properties'),
            require.resolve('babel-plugin-transform-decorators-legacy')
          ]
        }
      },
      { test: /\.s?css$/i, loader: 'style!css-loader' },
      { test: /\.s?less$/i, exclude:'/node_modules/',
        loader: 'style!style-loader!css-loader!less-loader' }
    ]
  }
};
