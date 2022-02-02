module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    },
  },
}
