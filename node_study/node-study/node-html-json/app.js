//读取html和json文件 
var http = require('http');
var fs = require('fs');

// 搭建服务器
var server = http.createServer(function (req, res) {
  // console.log('客户端向服务器发送请求：' + req.url)

  /* /  /favicon.ico  会请求2次*/
  if (req.url !== '/favicon.ico') {
    console.log('客户端向服务器发送请求：' + req.url);
  }
  // 响应头   application/json(代表json数据)
  res.writeHead(200, {'Content-type': 'text/html'});
  // 读取流，流事件是全局对象,读取html文件
  var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8')
  // 读取json文件
  // var myReadStream = fs.createReadStream(__dirname + '/person.json', 'utf8')
  // pipe管道事件，把响应的数据放到流里面通过pipe转变流向
  myReadStream.pipe(res)
})
server.listen(3000, '127.0.0.1')
console.log('server is running..')