// let 解决循环问题
// for (let i = 1; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, i*1000)
// }

// 深浅拷贝
// let a = {
//   name: 1
// }
// let b = a
// a.age = 2
// console.log(b.age)  // 2
// 两个值都是引用
// 浅拷贝
// let a = {
//   age: 1
// }
// // assign方法
// let b = Object.assign({}, a)
// a.age = 2
// console.log(b.age)  // 1

// // 展开运算符
// let c = {...a}
// a.age = 2
// console.log(c)

// 浅拷贝只解决第一层的问题

// 深拷贝  JSON化
// let a = {
//   age: 1,
//   jobs: {
//     first: 'hhh'
//   }
// }
// let b = JSON.parse(JSON.stringify(a))
// a.jobs.first = 'native'
// console.log(b.jobs.first) // hhh
// 局限性，
// 1.不能序列化函数， 不能解决循环引用的对象

let a = {
  age: undefined,
  jobs: function() {},
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
a.jobs = function name() {}
a.name = 'jj'
console.log(b) // {name: "yck"}