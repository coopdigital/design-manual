module.exports = ctx => ({
  plugins: {
    '@csstools/postcss-sass': {
      includePaths: []
    },
    'postcss-preset-env': {
      stage: 1
    },
    cssnano: ['production', 'staging'].includes(ctx.env) ? {} : false
  }
})
