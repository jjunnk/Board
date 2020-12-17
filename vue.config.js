
    //Basic path
    publicPath: process.env.NODE_ENV === 'production'
      ? '/sujin'
      : '/',
    //Output directory at build time
    outputDir = './sujin',
    //Output path of html
    indexPath: 'index.html',
  //File name hash
  filenameHashing: true,
   //For multi page configuration, default is undefined
   pages: {
    //page's entry file
    entry: 'src/index/main.js',
    //template file
    template: 'public/index.html',
    //Output file in dist/index.html
    filename: 'index.html',
    // When using the page title option,
    // The title tag in template needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Sujin Portfolio',
    // The blocks contained in this page, by default, contain
    // Extracted general chunks and vendor chunk s.
    chunks: ['chunk-vendos', 'chunk-common', 'index'],
  },  