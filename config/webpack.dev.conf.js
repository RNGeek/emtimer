const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: [
      'webpack-hot-middleware/client?noInfo=true&reload=true',
      'babel-polyfill',
      'tslib',
      './src/main.ts',
    ],
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: config.indexPath,
      template: 'index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
  ],
})
