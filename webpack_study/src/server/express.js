// 启动一个服务器
import express from 'express';
import path from 'path';

// 创建服务器
const server = express();

// 配置启动路径
// static方法，传递路径dist目录。
const staticMiddleware = express.static('dist')

// 监听代码
// 引入webpack模块
const webpack = require('webpack')
// 引入webpack配置文件
const config = require('../../config/webpack.dev.js')
// 使用webpack传入config配置对象
const compiler = webpack(config)

// webpack-dev-middleware 是一个方法，监听代码变化
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer)

// 热更新
// webpack-hot-middleware 也是一个方法
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

// 注意use顺序
// 运行监听代码
server.use(webpackDevMiddleware)
// 运行热更新
server.use(webpackHotMiddleware)
// 运行文件
server.use(staticMiddleware)

// listen方法。监听8080端口。
server.listen(8080, () => {
  console.log('servr is running...')
})