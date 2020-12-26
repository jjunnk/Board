const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: '/',
    pwa: {
      iconPaths: {
        favicon32: "./public/favicon.png",
        favicon16: "./public/favicon.png",
        appleTouchIcon: "./public/favicon.png",
        maskIcon: "./public/favicon.png",
        msTileImage: "./public/favicon.png"
      }
    },
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
    