// 在node端使用es6等语法，需要转译成es5
// 注意顺序，代码是从上往下执行
require('babel-register')
require('./index.js')
