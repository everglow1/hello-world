// 通过http模块，搭建本地服务器
var http = require('http')

// 创建服务器的方法,createServer方法
var server = http.createServer(function (req, res) {
  console.log('客服端向服务器发送请求：' + req.url)
  // 给客户端返回数据,要有响应头  plain(纯文本信息)
  res.writeHead(200, {'Content-type': 'text/plain'})
  res.end('server is working..')
})
// 服务器对象监听服务器地址及端口号
server.listen(7777, "localhost")

console.log("server is running...")