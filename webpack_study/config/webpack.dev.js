const path = require('path')
module.exports = {
  entry: {
    // 可以有多个。可用数组括起来。
    // main: 可随意写
    main: './src/main.js'
  },
  mode: "development",
  // 只有一个
  output: {
    // [name] // 生成 main
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  // 本地服务器配置
  devServer: {
    // 进入时，默认是dist目录。
    contentBase: 'dist'
  }
}