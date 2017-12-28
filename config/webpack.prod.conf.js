const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')

const env = config.build.env

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: [
      './lib/google-analysis.js',
      './lib/service-worker.js',
      'babel-polyfill',
      'tslib',
      './src/main.ts',
    ],
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new CopyWebpackPlugin([
      {
        from: config.staticPath,
        to: '.',
        ignore: ['.*'],
      },
    ]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'emtimer',
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [/_redirects$/],
      stripPrefix: 'dist/',
    }),
  ],
})
