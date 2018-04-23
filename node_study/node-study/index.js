// console.log('hello node!')

// node的全局对象有很多，比如下面的几个

// 定时器

// setTimeout(function () {
//   console.log('3 second have passed!')
// },0)
// 在规定的事件内不断的执行代码块内的语句
// var time = 0
// setInterval(function () {
//   time += 2
//   console.log(time + 'second have passed!')
//   if (time > 4) 
//     clearInterval(timer)  // 中断它
// },2000)

// 路径
// 1.不包含当前文件名的路径
console.log(__dirname)
// 2.包含当前文件名的路径
console.log(__filename)

// global
console.log(global)