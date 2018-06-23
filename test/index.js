var obj = {
  a: '1',
  b: '2'
}
obj.p = '3'
// console.log(Object.getOwnPropertyNames(obj))
// console.log('toString' in obj)
for ( i in obj) {
  // obj[i] i就是变量， 指向每次循环的值a b p
  // console.log(obj[i])  // 1 2 3
  // obj['i']  打了引号就是字符串,但是obj里面没有i这个键名（属性名），所以undefined
  // console.log(obj['i']) // undefined  undefined undefined
  console.log(i) // a b p
}
// var obj = Object.defineProperty( {}, 'o', {
//   value: 123,
//   configurable: false
// })