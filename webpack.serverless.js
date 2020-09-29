const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

const rootPath = resolve(__dirname, '.')
const srcPath = resolve(__dirname, 'src/serverless')
const distPath = resolve(__dirname, 'dist/serverless')

module.exports = (env, argv) => ({
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    '_aggregate-memory-measurement': resolve(srcPath, '_aggregate-memory-measurement.ts'),
  },
  output: {
    path: distPath,
    // Netlify Function の Node.js ランタイム上で実行できるよう,
    // `module.exports` スタイルのモジュールシステムを利用する.
    // ref: https://webpack.js.org/configuration/output/#outputlibrarytarget
    // ref: https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs',
  },
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.serverless.json',
        },
        include: [srcPath],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },
})
