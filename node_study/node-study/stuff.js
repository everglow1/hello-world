// 方法1
var counter = function (arr) {
  return '一共有' + arr.length + '个元素在数组中'
}
// 方法2
var adder = function (a,b) {
  return `需要计算的两个值的和为${a + b}`
}
// 属性
var p = 3.14
// module.exports  (exports: 我也让什么方法，让其它文件来使用)
// module.exports = counter
// module.exports = adder
// module.exports = p

// 上述写法，会被覆盖

// 这种写法，也可以
// module.exports.counterr = counter
// module.exports.adderr = adder
// module.exports.pp = p

// 这种对象写法也可以
module.exports = {
  counterr: counter,
  adderr: adder,
  pp: p
}
