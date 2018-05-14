// const promise = new Promise(function (resolve, reject) {
//   console.log('promise');
//   // promise传一个参数作为函数，函数里面的两个参数也为两格函数
//   resolve();
// }); 
// promise.then(function () {
//   console.log('resolve');
// });
// console.log('h1')

// 创建一个promise实例
// 构造函数接受一个函数作为参数，该函数的两个参数分别是两个函数（js内部提供的）。
// resolve函数将Promise对象的状态从“未完成”变为“成功”（从pendding 变为 resolved），
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
// reject函数将。。。。。。。。。从“未完成”变为“失败”
// const promise = new Promise( function (resolve, reject) {
//   // ...some code
//   if (/* 异步操作成功*/ true) {
//     resolve(value);
//   } else {
//     reject(error)
//   }
// });
// // 实例生成之后，可以使用.then方法分别指定resolved状态和rejected状态的回调函数。
// // then接受两个回调函数作为参数。
// // 第一个是promise的状态变为resolved时调用
// // 第二个参数是可选的，不一定提供。promise状态变为rejected时调用
// promise.then( function (value) {
//   // success
// }, function(error) {
//   // false
// }
// )

// timeout方法实例
// 过了100ms之后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。
// function timout(ms) {
//   return new Promise( (resolve, reject) => {
//     // 100ms后，返回信息'done'
//     setTimeout(resolve, ms, 'done');
//   })
// }
// timout(100).then( (value) => {
//   console.log(value);
// })

// Promise新建后会立即执行
// let promise = new Promise( function(resolve, reject) {
//   console.log('Promise');
//   resolve()
//   console.log('1')
// });
// promise.then( function() {
//   console.log('resolved');
// });
// console.log('hi');
// Promise  1  hi  resolved

// 执行顺序
// const first = () => (new Promise((resovle,reject)=>{
//   // 1.promise立即执行
//   console.log(3);
//   let p = new Promise((resovle, reject)=>{
//     // 2.Promise的立即执行
//     console.log(7);
//     setTimeout(()=>{
//       // 6.最后执行setTimeout回调函数。
//       console.log(5);
//       // 不会执行，promise一旦确认不会在变
//       resovle(6);
//     },0)
//     // 4.微任务（回调）prmoise, p的回调
//     resovle(1);
//   });
//   // 5.再执行不是内promise的回调。
//   resovle(2);
//   p.then((arg)=>{
//     // 4.微任务（回调）prmoise, p的回调
//       console.log(arg);
//   });
// }));
// // 5.再执行不是内promise的回调。
// first().then((arg)=>{
//   console.log(arg);
// });
// // 3.同步队列
// console.log(4);

// console.log(Promise.reject(3).then(() => {}, () => {}))

// 作为参数的Promise实例，自己定义了catch方法，它一旦被rejected，并不会触发Promise.all()的catch
// 因为参数promise的catch后，参数promise就相当于是没有错误了，错误被解决了,变成了resolved。
// 所以.all参数里面的两个实例都会resolved，因此都会调用then方法指定的回调函数，而不会调用catch的回调函数。
// 如果p2没有自己的catch方法，就会调用.all的catch方法。
// const p1 = new Promise((resolve, reject) => {
//   resolve('hello');
// })
//   .then(result => result)
//   .catch(function (e) {return e});

// const p2 = new Promise((resolve, reject) => {
//   throw new Error('报错');
// })
//   .then(result => result)
//   // .catch(e => e)
// Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e));

// Promise.race也是将多个Promise实例，包装成一个新的Promise实例。
// 只要其中一个实例先改变状态，.race的状态就跟着改变。该实例返回值传递给.race
// const p = Promise.race([
//   fetch('/resource-that-may-take-a-while'),
//   new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('request timeout')), 5000)
//   })
// ]);
// p
// .then(console.log)
// .catch(console.error);

// // Promise>resolve()，将现有对象转为Promise对象。
// const jsPromise = Promise.resolve($.ajax('/whatever.js'))

// Promise.resolve('foo')
// // 等价于
// new Promise(resolve => resolve('foo'))
// // 等价于
// new Promise(function (resolve) {return resolve('foo')})

// 参数不是具有then方法的对象，或者根本不是对象
// const p = Promise.resolve('hello');
// p.then(function (s) {
//   console.log(s)
// });

// 不带参数
// const p = Promise.resolve();
// p.then (function () {
//   // ...
// })

// resolved的Promise对象，是在本轮事件循环的结束时，而不是在下一轮事件的开始时。
// setTimeout(function () {
//   console.log('3')
// },0);
// Promise.resolve().then(function () {
//   console.log('2');
// });
// const p = new Promise(function(resolve, reject) {
//   console.log('0');
//   resolve();
// })
// console.log('1');
// 0 1 2 3

// Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected.
// const p = Promise.reject('error');
// 等同于
// const p = new Promise( (resolve, reject) => reject('error'));
// p.then(null, s => console.log(s));

// .reject()方法的参数，会原封不动的作为reject的理由，变成后续方法的参数。这点与.resolve方法不同
const thenable = {
  then (resolve, reject) {
    reject('error');
  }
};
Promise.reject(thenable)
  .catch(e => {
    console.log(e === thenable)
  })
// true
// catch方法的参数不是error这个字符串，而是这个thenable对象