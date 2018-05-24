require('babel-runtime/regenerator')
// 让客户端发生变化
require('webpack-hot-middleware/client?reload=true')
require("./main.css")
require('./index.html')
// debugger
// console.log('hello')
// var a = () => console.log('hello babel!')

// var a = async () => {
//   await console.log('hello')
//   console.log('done')
// }