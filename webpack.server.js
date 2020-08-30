const { resolve } = require('path')

const rootPath = resolve(__dirname, '.')
const srcPath = resolve(__dirname, 'src/server')
const distPath = resolve(__dirname, 'dist/server')

module.exports = (env, argv) => ({
  entry: {
    hello: [
      resolve(srcPath, './hello.ts'),
    ],
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
          configFile: 'tsconfig.server.json',
        },
        include: [srcPath],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },
})
