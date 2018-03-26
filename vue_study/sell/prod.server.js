/* eslint-disable */
// var express = require('express');
// // 依赖config做一些配置
// var config = require('./config/index');

// var port = process.env.PORT || config.build.port;

// // 启动一个express
// var app = express();

// // 定义一个router
// var router = express.Router();

// router.get('/', function (req, res, next) {
//   req.url = 'index.html';
//   next();
// });
// // 通过app 来使用这个router
// app.use(router);

// var appData = require('./data.json')
// var seller = appData.seller
// var goods = appData.goods
// var ratings = appData.ratings

// var apiRoutes = express.Router();

// apiRoutes.get('/seller', (req, res) => {
//     res.json({
//       errno: 0,
//       data: seller
//     })// 接口返回json数据，上面配置的数据seller就赋值给data请求调用
//   }),
// apiRoutes.get('/goods', (req, res) => {
//   res.json({
//     errno: 0,
//     data: goods
//   })
// }),
// apiRoutes.get('/ratings', (req, res) => {
//   res.json({
//     errno: 0,
//     data: ratings
//   })
// })
// // 异步接口
// app.use('/api', apiRoutes);
// // 定义static目录
// app.use(express.static('./dist'));

// module.exports = app.listen(port, function(err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('Listening at http://localhost:' + port + '\n')
// })

