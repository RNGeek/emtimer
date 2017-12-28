const path = require('path')

module.exports = {
  indexPath: path.resolve(__dirname, '../dist/index.html'),
  distPath: path.resolve(__dirname, '../dist'),
  staticPath: path.resolve(__dirname, '../static'),
  srcPath: path.resolve(__dirname, '../src'),
  testPath: path.resolve(__dirname, '../test'),
  build: {
    env: {
      NODE_ENV: '"production"',
    },
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 8080,
  }
}
