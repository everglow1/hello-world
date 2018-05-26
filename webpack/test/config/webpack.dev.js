const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // [name] (匹配入口处的index)
    filename: '[name]-bundle.js',
    publicPath: '/'
  },
  mode: 'production',
  // 本地服务器设置,webpack-dev-server
  devServer: {
    contentBase: 'dist',
    hot: true,

    // inline: true
  },
  module: {
    rules: [
      // css loader
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      // js loader
      {
        test: /\.js$/,
        use: [
          {loader: 'babel-loader'}
        ],
        exclude: /node_modules/
      },
      // img loader
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: 'images/[name]-[hash:8].[ext]'
              name: 'images/[name].[ext]'
            }
          },
        ]
      },
      // html loader
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img: src']
            }
          },
          // {
          //   loader: 'raw-loader'
          // }
        ]
      }
    ]
  },
  plugins: [
    // 实例化一个webpack的方法
    new webpack.HotModuleReplacementPlugin(),
    // 生成html文件，并将bundle自动引入。
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}