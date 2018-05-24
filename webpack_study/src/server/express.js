// 启动一个服务器
import express from 'express';
import path from 'path';

// 创建服务器
const server = express();

// 配置启动路径
// static方法，传递路径dist目录。
const staticMiddleware = express.static('dist')

// 监听代码
const webpack = require('webpack')
const config = require('../../config/webpack.dev.js')
const compiler = webpack(config)

// webpack-dev-middleware 是一个方法
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer)

// 热更新
// webpack-hot-middleware 也是一个方法
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

// 注意use顺序
server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)
server.use(staticMiddleware)

server.listen(8080, () => {
  console.log('servr is running...')
})