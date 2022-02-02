const CopyWebpackPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { execSync } = require('child_process')

const rootPath = resolve(__dirname, '.')
const libPath = resolve(__dirname, 'lib')
const staticPath = resolve(__dirname, 'static')
const srcPath = resolve(__dirname, 'src/frontend')
const distPath = resolve(__dirname, 'dist/frontend')

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

  devServer: {
    static: {
      directory: distPath,
    },
    historyApiFallback: true,
    proxy: {
      '/.netlify': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' },
      },
    },
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
        test: /\.(css|postcss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.frontend.json',
          appendTsSuffixTo: [/\.vue$/],
        },
        include: [srcPath],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.mp3$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
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
      filename: '[name].css',
      chunkFilename: '[id].css',
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
    new GenerateSW({
      cacheId: 'emtimer',
      swDest: resolve(distPath, './service-worker.js'),
      exclude: [/_redirects$/],
      // 一旦巨大なチャンクでもキャッシュできるように上限を引き上げる
      // TODO: チャンクを分割して上限の上書きをやめる
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    }),
  ],
})
