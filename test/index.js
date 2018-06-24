var obj = {
  a: '1',
  b: ''
}
obj.p = '3'
// console.log('b' in obj)  // true
// // console.log(Object.getOwnPropertyNames(obj))
// // console.log('toString' in obj)
// for ( i in obj) {
//   // obj[i] i就是变量， 指向每次循环的值a b p
//   // console.log(obj[i])  // 1 2 3
//   // obj['i']  打了引号就是字符串,但是obj里面没有i这个键名（属性名），所以undefined
//   // console.log(obj['i']) // undefined  undefined undefined
//   console.log(i) // a b p
// }
// console.log(obj.length)   // undefined
// var obj = Object.defineProperty( {}, 'o', {
//   value: 123,
//   configurable: false
// })

var arr = Array.prototype.slice.call(obj)
console.log(arr['a'])


// var a = ['hell', 'a', 'b', '']
// a[100] = 'c'
// // console.log('0' in a)   // true
// console.log(4 in a)   // false
// console.log(a.length)
// console.log(a['0'])
// a[-1] = 'v'
// console.log(a.length)  // 3
// console.log(a)   // ['hell', 'a', 'b', '-1': 'v']

// a[6] = 'c'
// console.log(a)

// for (var i = a.length; i < a.length; i--) {
//   console.log(a[i])
// }

// var i = a.length
// while(i--) {
//   console.log(a[i])
// }