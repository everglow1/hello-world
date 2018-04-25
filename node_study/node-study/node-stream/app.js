// 读取数据流，写入数据流
// 引入文件模块
// var fs = require('fs')
// __dirname(本身文件以上的路径)
// 读取文件流
// var myReadStream = fs.createReadStream('readMe.txt', 'utf-8')

// console.log(myReadStream)   // 会得到整个对象
// on添加事件  data(约定的写法)  chunk(一小块一小块的返回)
// myReadStream.on('data', function (chunk) {
//   console.log('正在接受一部分数据')
//   console.log(chunk)
//   // 把chunk写入文件writeMe.txt
//   myWriteStream.write(chunk)
// })

// 写入文件流
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe2.txt')

// pipe 把左边写入到右边
// myReadStream.pipe(myWriteStream)


// 用pipe写入到页面

// 引入http模块，fs模块
var http = require('http')
var fs = require('fs')
// 搭建服务器
var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-type': 'text/plain'})
  var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8')
  myReadStream.pipe(res)
})

server.listen(3000, '127.0.0.1')
console.log('server is running..')