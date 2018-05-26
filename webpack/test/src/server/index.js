// import属于es6的语法，需要转译。
import express from 'express';
import path from 'path';
import webpack from 'webpack';

// 创建服务器
const server = express();

// Express 内置的 express.static 可以方便地托管静态文件
const staticMiddleware = express.static('dist')

// 监听文件变化
const config = require('../../config/webpack.dev.js')
const compiler = webpack(config)
const webpackDevMiddleWare = require('webpack-dev-middleware')(compiler, config.devServer) 

// 实时页面热重载
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

server.use(webpackDevMiddleWare)
server.use(webpackHotMiddleware)
server.use(staticMiddleware)


server.listen(8000, () => {
  console.log('server is running..')
})