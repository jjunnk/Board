const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: '/',
    configureWebpack: {
      plugins:[
        new MiniCssExtractPlugin({
          filename: '[name].css',
          ignoreOrder: true
        }),
      ],
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      }, 
    }
  };
    