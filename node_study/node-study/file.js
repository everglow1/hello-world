// 文件系统模块
// 1.引入文件系统模块
var file = require('fs')
// 2.通过对象调用方法,同步调用，第一个参数，文件名的路径,第二个参数，编码方式
// var readMe = file.readFileSync('readMe.txt', 'utf-8')
// console.log(readMe)

// 同步写入文件,第一个参数，写入的文件名，第二个参数，写入的东西,该第二个参数就是把readMe的内容写入writeMe
// file.writeFileSync('writeMe', readMe)

// 异步读取文件,第一个参数为读取的方式，第二个为编码方式，第三个是一个回调函数
// file.readFile('readMe.txt', 'utf-8', function (er, data) {
//   if (er) throw er
//   console.log(data)
// })

// 异步写入文件
file.readFile('readMe.txt', 'utf-8', function (er, data) {
  if (er) throw er
  file.writeFile('writeMe2.txt', data)
})

