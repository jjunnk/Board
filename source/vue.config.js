module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: process.env.NODE_ENV === 'production'
    ? '/sujin/'
    : '/',
    pwa: {
      name:'sujin portfolio',
      workboxOptions: {
        exclude: [/_redirects/]
      }
    }
    /*
    entry: {
      main: './src/main.js',
    },
    output: {
      filename: 'bundle.js',
      path: './dist'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },*/
  };
  