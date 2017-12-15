process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const webpack = require('webpack')

const config = require('./config')
const webpackConfig = require('./webpack.prod.conf')

rm(config.distPath, err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
    }))
  })
})
