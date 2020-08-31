const { resolve } = require('path')

const rootPath = resolve(__dirname, '.')
const srcPath = resolve(__dirname, 'src/serverless')
const distPath = resolve(__dirname, 'dist/serverless')

module.exports = (env, argv) => ({
  entry: {
    'aggregate-memory-measurement': resolve(srcPath, 'aggregate-memory-measurement.ts'),
  },
  output: {
    path: distPath,
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
