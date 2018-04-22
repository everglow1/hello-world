var express = require('express')
var port = 8088

var app = express()
// 实例化一个路由
var router = express.Router()
// 抓住最开始的根路径
router.get('/', function (req, res, next) {
  // 赋值为index.html
  req.url = '/index.html'
  next()
})
// 使用app中间件
app.use(router)

// 接口数据
// 1.读取json数据
var goods = require('./data/goods.json')
var ratings = require('./data/ratings.json')
var seller = require('./data/seller.json')

// 2.路由
var routes = express.Router()

// 3.编写接口
routes.get('/goods', (req, res) => {
  res.json(goods)
})
routes.get('/ratings', (req, res) => {
  res.json(ratings)
})
routes.get('/seller', (req, res) => {
  res.json(seller)
})
// 配置api,接口前面都会有一个api
app.use('/api', routes)

// 定义static目录，指向./dist目录
app.use(express.static('./dist'))

// 启动express
module.exports = app.listen(port, function (err) {
  // 如果有错，打印出来错误
  if (err) {
    console.log(err)
    return
  }
  // 否则打印出来怎么启动
  console.log('http://localhost:' + port + '\n')
})
