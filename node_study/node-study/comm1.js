let name = 'zhangsan'

// 公开出去模块,各种写法

// module.exports 和 exports区别？ module.exports.a 相当于 exports.a



module.exports = {
  a: 'name'
}
exports.name = 'lisi'

// 如果两个都写了，module.exports会覆盖exports
