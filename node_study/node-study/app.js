// 接受，引入的是一个对象
// var counter = require('./stuff')

// console.log(counter(['Hnery', 'mary', 'emmiiy ']))
// console.log(counter(5, 6))

// 这种写法, 使用stuff对象的各个方法
var stuff = require('./stuff')
console.log(stuff.counterr(['Hnery', 'mary', 'emmiiy ']))
console.log(stuff.adderr(5, stuff.pp))
