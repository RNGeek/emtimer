process.env.NODE_ENV = 'development'

const opn = require('opn')
const express = require('express')
const webpack = require('webpack')

const config = require('./config')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

// serve pure static assets
app.use(config.staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, (err) => {
  if (err) throw err
  opn(uri)
})
