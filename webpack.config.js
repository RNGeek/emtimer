const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const rootPath = resolve(__dirname, '.');
const libPath = resolve(__dirname, './lib');
const staticPath = resolve(__dirname, './static');
const srcPath = resolve(__dirname, './src');
const distPath = resolve(__dirname, './dist');

/** @type import('webpack').ConfigurationFactory */
module.exports = (env, argv) => ({
  entry: {
    app: [
      resolve(libPath, './google-analysis.js'),
      resolve(libPath, './service-worker.js'),
      'tslib',
      resolve(srcPath, './index.tsx'),
    ],
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js',
  },
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(distPath, './index.html'),
      template: resolve(rootPath, './index.html'),
      inject: true,
    }),
    new CopyWebpackPlugin([
      {
        from: staticPath,
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
});
