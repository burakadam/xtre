var path = require('path')
module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve('src'),
        Components: path.resolve(__dirname, 'src/components'),

        Customcontrols: path.resolve(
          __dirname,
          'src/components/customcontrols'
        ),

        Helpers: path.resolve(__dirname, 'src/library/helpers'),

        Constant: path.resolve(__dirname, 'src/library/constants')
      }
    }
  },

  transpileDependencies: ['vuetify']
}
