// 引入experss
var express = require('express')

// 实例化express对象
var app = express()

// 通过对象调用对应的方法

// 根据用户请求的地址，返回对应的数据信息
app.get('/',function (req, ress) {
  // 可以拿到用户请求的地址
  console.log(req.url)
  // 返回过来的信息
  ress.send('this is home page!')
})
app.get('/contact', function (req, res) {
  res.send('this is contact')
  console.log(req.url)
})
// 通过get，可以对所有页面进行操作，假如有10个页面，写10个get就可以了

// 路由参数
// 当我们访问的路径为localhost:3000/(后面不管是啥)，都将返回（你所输入的路径参数为：它所输入的内容）
app.get('/profile/:id', function (req, res) {
  res.send('你访问的路径参数为：' + req.params.id)
})
// 监听服务器端口号
app.listen(8000)


