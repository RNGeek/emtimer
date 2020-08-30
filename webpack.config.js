const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { execSync } = require('child_process')

const rootPath = resolve(__dirname, '.')
const libPath = resolve(__dirname, 'lib')
const staticPath = resolve(__dirname, 'static')
const srcPath = resolve(__dirname, 'src')
const distPath = resolve(__dirname, 'dist')

const revisionId = execSync('git rev-parse --short HEAD').toString().trim()

module.exports = (env, argv) => ({
  entry: {
    app: [
      resolve(libPath, './google-analysis.js'),
      resolve(libPath, './service-worker.js'),
      'tslib',
      resolve(srcPath, './main.ts'),
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            audio: 'src',
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href',
          },
        },
      },
      {
        test: /\.css$/,
        // ref: https://vue-loader.vuejs.org/guide/extract-css.html#webpack-4
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        include: [srcPath],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.mp3(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'audio/[name].[hash:7].[ext]',
        },
      },
    ],
  },

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.ts', '.tsx', '.vue', '.json'],
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new DefinePlugin({
      __REVISION_ID__: JSON.stringify(revisionId),
    }),
    new HtmlWebpackPlugin({
      filename: resolve(distPath, './index.html'),
      template: resolve(rootPath, './index.html'),
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: staticPath,
          to: '.',
        },
      ],
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'emtimer',
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [/_redirects$/],
      stripPrefix: 'dist/',
    }),
  ],
})
