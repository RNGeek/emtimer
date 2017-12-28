const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')

const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: [
      './lib/google-analysis.js',
      './lib/service-worker.js',
      'babel-polyfill',
      'tslib',
      './src/main.ts'
    ]
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      filename: config.indexPath,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new CopyWebpackPlugin([
      {
        from: config.staticPath,
        to: '.',
        ignore: ['.*']
      }
    ]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'emtimer',
      filename: 'service-worker.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/_redirects$/],
      stripPrefix: 'dist/',
    }),
  ]
})

module.exports = webpackConfig
