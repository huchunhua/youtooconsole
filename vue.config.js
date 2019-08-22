// const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  productionSourceMap: false,
  // chainWebpack: config => {
  //   config.plugin('define').tap(args => {
  //     args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
  //     return args
  //   })
  //   if (process.env.NODE_ENV === 'production') {
  //     config
  //       .plugin('compression')
  //       .use(CompressionPlugin, {
  //         asset: '[path].gz[query]',
  //         algorithm: 'gzip',
  //         test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
  //         threshold: 10240,
  //         minRatio: 0.8,
  //         cache: true
  //       })
  //       .tap(args => { })
  //   }
  // }
}