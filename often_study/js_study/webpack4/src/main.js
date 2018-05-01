// 引入css模块
// 放到最上面，在运行时进行编译
require('babel-runtime/regenterator')
require('./main.css');
require('./index.html');

var a = async args => {
  const {a, b} = args
  await console.log('hello', a, b)
  console.log('done')
}
a({a: 1, b: 2})