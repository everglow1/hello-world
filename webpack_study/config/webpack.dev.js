const path = require('path')
import webpack from 'webpack'
module.exports = {
  entry: {
    // 可以有多个。可用数组括起来。
    // main: 可随意写
    main: './src/main.js'
    // main: ['core-js/fn/promise', './src/main.js']
    // main: ['babel-polyfill', './src/main.js']
  },
  mode: "development",
  // 只有一个
  output: {
    // [name] // 生成 main
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  // 本地服务器配置
  devServer: { 
    // 进入时，默认是dist目录。
    contentBase: 'dist',
    hot: true,
    // 使报错在开发者工具里面也可以看到
    overlay: true
  },
  module: {
    rules: [
      // js loader
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        // 忽略不要转换
        exclude: /node_modules/
      },
      // css loaders
      {
        test: /\.css$/, 
        use: [
          // 多个loader配置, 这地方顺序有问题也会报错
          // 将css能写入到html中
          {loader: 'style-loader'},
          // 将样式放到main-bundle.js中
          {loader: 'css-loader'}
        ]
      },
      // html loaders
      {
        test: /\.html$/,
        use: [
          {
            // 给当前加载的这个文件取名
            loader: 'file-loader',
            // 配置信息
            options: {
              // 给加载文件取名与原文件名一样的名字
              name: '[name].html'
            }
          },
          {
            // 将我们index.html跟bundle.js进行区分，会将html文件和bundle.js文件进行分割，不会融入到一起
            loader: 'extract-loader'
          },
          {
            // 会找到html文件，然后借助extract-loader分离，然后file-loader取名
            loader: 'html-loader',
            options: {
              // 图片需要配置的。
              attrs: ['img:src']
            }
          }
        ]
      },
      // img loader
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // hash:8(8位的哈希值)
              name: 'images/[name]-[hash:8].[ext]'
              // 随便写
              // name: '[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}