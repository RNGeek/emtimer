const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

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
    new FriendlyErrorsPlugin(),
  ],
})

if (process.env.NODE_ENV === 'test') {
  module.exports = merge(module.exports, {
    target: 'node',
    externals: [nodeExternals()],
  })
}
