// 配置
const path = require('path')
module.exports = {
  // 入口文件,可以有多个（用数组），
  entry: {
    main: ['./src/main.js']
  },
  // 打包环境： 开发 & 生产
  mode: 'development',
  // 出口：有且只有一个
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, '../dist'),
    // 公开的路径
    publicPath: '/'
  },
  // 本地服务器
  devServer: {
    // 默认进入的是dist目录
    contentBase: 'dist'
    // overplay: true
  },
  // 配置loader
  module: {
    rules: [
      // css loaders
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
      },
      // html loaders
      {
        test: /\.html$/,
        use: [
          // 文件取名
          {loader: 'file-loader', options: {name: '[name].html'}},
          // 将HTML文件和js文件进行分割，不会融入到一起
          {loader: 'extract-loader'},
          // html loader,
          {loader: 'html-loader', options: {attrs: ['img: src']}}
        ]
      },
      // img loader
      {
        test: /\.(jpg | png | gif)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   // 名字，ext原本是什么名字就是什么名字
          //   options: {name: 'images/[name]-[hash:8].[ext]'}
          // },
          {
            loader: 'url-loader',
            options: {
              limit: 500,
              outputPath: 'images/',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}