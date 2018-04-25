var http = require('http')
var fs = require('fs')

// 搭建服务器
var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    // 判断用户所访问的页面地址 ||(或者)
    if (req.url === '/home' || req.url === '/') {
      res.writeHead(200, {'Content-type': 'text/html'});
      fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res)
    } else if (req.url === '/contact') {
      res.writeHead(200, {'Content-type': 'text/html'});
      fs.createReadStream(__dirname + '/contact.html', 'utf8').pipe(res)
    } else if (req.url === '/api/docs') {
      var data = [{name: "everglow", age: "20"}, {name: "buff", age: '21'}]
      // res.writeHead(200,{'Content-type': 'application/json'})
      res.writeHead(200,{'Content-type': 'text/html'})
      fs.createReadStream(__dirname + '/api/docs.html', 'utf8').pipe(res)
      // res.end(JSON.stringify(data))
    }
  }
})
server.listen(3000, '127.0.0.1')
console.log('sever is running..')