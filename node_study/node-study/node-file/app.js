// 1.引入文件系统模块
var file = require('fs')
// 2.使用模块调用方法
// file.unlink('../writeMe2.txt', function (err) {
//   if (err)
//     throw err
//   console.log('文件删除成功！')
// })

// 创建文件夹 同步创建， 异步创建
//  file.mkdir('stuff')

// 删除文件夹
// file.rmdir('stuff')

// 异步创建和删除文件夹
// file.mkdir('stuff', function () {
//   file.readFile('readMe.txt', 'utf-8', function(err) {
//     if (err) throw err
//       file.writeFile('writeMe.txt', 'data')
//   })
// })

//异步删除文件夹
// 1.先删除文件夹中的文件， 2.再删除外部的文件夹
file.unlink('./stuff/readMe.txt', function () {
  file.rmdir('stuff', function (err) {
    if (err) throw err
    console.log('文件夹删除成功')
  })
})


