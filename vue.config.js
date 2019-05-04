const path = require('path')
let baseUrl = '/test/'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? baseUrl : '/',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))

    config
      // 开发环境
      .when(process.env.NODE_ENV === 'development',
        // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )

    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('utils', resolve('src/utils'))
      .set('plugin', resolve('src/plugin'))
      .set('components', resolve('src/components'))

    config.externals({
      'AMap': 'AMap'
    })
  },

  devServer: {
    port: 8081
    /*     proxy: {
      '/api': {
        target: 'url',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      }
    } */
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }

}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/style/_variables.scss'),
        path.resolve(__dirname, './src/style/mixin.scss')
      ]
    })
}
