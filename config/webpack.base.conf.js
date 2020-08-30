const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

const config = require('./config')

const revisionId = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim()

module.exports = {
  output: {
    path: config.distPath,
    filename: 'js/[name].[hash].js',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.ts', '.vue', '.json'],
  },
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
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        include: [config.srcPath, config.testPath],
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: config.indexPath,
      template: 'index.html',
      inject: true,
    }),
    new DefinePlugin({
      __REVISION_ID__: JSON.stringify(revisionId),
    }),
  ],
}
