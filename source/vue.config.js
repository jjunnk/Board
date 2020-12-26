const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: '/',
    pwa: {
      name:'sujin portfolio',
      workboxOptions: {
        exclude: [/_redirects/]
      },
      iconPaths: {
        favicon32: "favicon.png",
        favicon16: "favicon.png",
        appleTouchIcon: "favicon.png",
        maskIcon: "favicon.png",
        msTileImage: "favicon.png"
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
    