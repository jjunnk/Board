module.exports = {
    transpileDependencies: ["vuetify"],
    mode: 'production',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/sujin/'
    : '/',
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
    },
  };
  