// 接受，引入的是一个对象
// var counter = require('./stuff')

// console.log(counter(['Hnery', 'mary', 'emmiiy ']))
// console.log(counter(5, 6))

// 这种写法, 使用stuff对象的各个方法
// var stuff = require('./stuff')
// console.log(stuff.counterr(['Hnery', 'mary', 'emmiiy ']))
// console.log(stuff.adderr(5, stuff.pp))

// 事件模块
// 1.引入事件模块,自带的模块引入
var events = require('events')
// 2.创建EventEmitter对象,该事件可以取注册，激活事件
var myEmitter = new events.EventEmitter()
// 3.注册事件, .on注册事件，第一个参数是事件名字，第二个是回调函数
myEmitter.on('someEvent', function (msg) {
  // 异步
  setImmediate(() => {
    console.log('这是异步的')
  })
  console.log(msg)
})
// 4.触发事件,emit触发事件，第一个参数是触发的事件名,第二个参数可以传递给该事件的回调函数
myEmitter.emit('someEvent', '实现事件并传递此参数到事件的回调函数中')
console.log(1)