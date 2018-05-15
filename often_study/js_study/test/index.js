// var counter = {
//   count: 0,
//   inc: function () {
//     this.count ++;
//   }
// }
// var fun = counter.inc.bind(counter);
// fun();
// console.log(counter.count); // 1

// var obj = new Base();
// // 等同于
// var obj = {}
// obj._proto_ = Base.prototype;
// Base.call(obj)

// for (var i = 0; i < 5; i++) {
//   (function() {
//     setTimeout(function () {
//       console.log(i)
//     }, 1000*i)
//   })(i)
// }

// for (var i = 0; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000 * i)
// }

// try {
//   throw new Error('出错了！');
// } catch (a) {
//   // console.log(e.name);
//   // console.log(e.stack);
//   console.log(a.message);
// } finally {
//   console.log('完成')
// }
// console.log('222');

// function cleanUp () {
//   try {
//     throw new Error('出错了.....')
//     console.log('此行不会执行')
//   }
//   /* 不管有没有错误，都会在最后执行的语句*/ 
//   finally {
//     console.log('完成清理')
//   }
// }
// console.log('222')
// cleanUp()

// 首先打开一个文件，然后在try中写入文件，如果没有发生错误，则运行finally代码块关闭文件，
// 一旦发生错误，则先使用catch代码块处理错误，再用fina代码块关闭文件。      
// openFile();
// try {
//   writeFile (Data);
// } catch(e) {
//   handleError(e);
// } finally {
//   closeFile();
// }

// function f() {
//   try {
//     console.log(0);
//     throw 'bug';
//   } catch (e) {
//     console.log(1);
//     return true;
//     console.log(2);
//   } finally {
//     console.log(3);
//     return false;
//     console.log(4);
//   }
//   console.log(5);
// }
// f()

// var x = -1;
// if (x < 0) {
//   throw new Error('x 必须为正数');
// }

// 一旦抛出错误，就终止执行
// throw 42;
// console.log('3')

// try {
//   console.log('x')
// } catch (e) {
//   console.log('2')
// } finally {
//   console.log('3')
// }

// function idle (x) {
//   try {
//     console.log(x);
//     // return 'result';
//     throw 'error'
//   } finally {
//     console.log('finally');
//   }
// }
// idle('hello')

// const声明的变量，原始值类型不可变，引用类型的数据接口可变，它只是固定了指向对象的指针不可变
// const foo = {};
// foo.prop = 123;
// console.log(foo.prop);

// foo = {}
// 模式匹配，等号两边的模式相同，左边的变量就会被赋予对应的值。
// 也可以用默认值，但是默认值生效的条件是对象的属性值严格等于undefined
// let [a, b, c] = [1, 2, 3];
// let [x, y, z] = new Set(['a', 'b', 'c'])
// let [x, y = 'b'] = ['a']
// // 对象解构，同名，解构失败，变量的值等于undefined
// let {foo, bar} = {foo: 'aaa', bar: 'bbb'}

// duix的解构赋值，可以很方便的将现有的对象的方法，赋值到某个变量

// 解构赋值的规制是只有等号右边的值不是对象或者数组，就先将其转化为对象。 undefined和null无法转为对象


// 函数参数的解构也可以使用默认值
// function move({x=0, y=0} = {}) {
//   return [x, y]
// }
// // move({x: 3, y: 8});
// console.log(move({x: 3, y: 8}))

// 解构赋值的用处
// 不使用中间变量交换两个数的值
// let x= 1;
// let y= 2;
// [x,y] = [y, x]
// console.log(x)
// console.log(y)

// 从函数返回多个值
// function example() {
//   return [1, 2, 3]
// }
// let [a, b, c] = example();
// console.log(a,b,c)

// 返回对象
// function example() {
//   return {
//     foo: 1,
//     b0: 2
//   }
// }
// let {foo, b0} = example();
// console.log(b0)

// 提取json数据的值
// let json = {
//   id: 42,
//   status: "ok",
//   data: [789,675]
// }
// let {id, status, data:number} = json;
// console.log(id, status, number);

// 指定函数参数的默认值
// jquery.ajax = function (url, {
//   async = true,
//   beforeSend = function () {
//     cache = true
//   }
// }) {}

// <% %> 模板字符串放置js代码。 <%=  %> 输出js代码
// let template = `
// <ul>
//   <% for(let i = 0; i < data.supplies.length; i++) { %>
//     <li> <%=data.supplies[i] %> </li>
//   <% } %>
// </ul>
// `; 

// 数值的扩展 Number.isFinite 检查一个数值是否为数值。除了数值意外其它都返回false
// console.log(Number.isFinite(NaN));  //false
// // isNaN 用来检查一个值是否为NaN,如果参数类型不是NaN，返回false
// console.log(Number.isNaN('true'/ 0));  // true

// isFinite(25);  // true
// isFinite('25'); // true
// Number.isFinite(25); //true
// Number.isFinite('25'); //false    与传统全局方法isFinite的区别 ，传统的方法会将非数值的转化为数值，在判断

// parseInt 与 Number.parseInt   parseFloat 与 Number.parseFloat 行为保持一致。只是逐步减少全局性的方法，使语言模块化

// Number.EPSILON  // JS能表示的最小精度值。如果误差小于这个值，就可以认为没有意义，引入它是为了浮点运算设置一个误差范围

// Math对象新增了17个与数学相关的方法，都是静态方法，只能在Math对象上调用

// Math.trunc(41.3);  // 4   去除一个数的小数部分，返回整数部分
// Math.trunc(-2.4);  // -2  
// 对于非数值，会使用Number将它转换为数值
// Math.trunc(true); // 1
// console.log(Math.trunc(undefined));  // NaN
// console.log(Math.trunc('NN'));  //NaN
// console.log(Math.trunc());  //NaN

// sign方法用于判断一个数为正还是负，还是0，非数值会先转化为数值
// console.log(Math.sign()) //NaN
// console.log(Math.sign(''))  // 0
// console.log(Math.sign(-5))  //-1
// console.log(Math.sign(+0))   // 0
// console.log(Math.sign(-0))  // -0

// 函数的扩展
// es6之前，不能为函数指定默认值,只能采用变通的方法
// function logg(x, y) {
//   y = y || 'World';
//   console.log(x, y);
// }
// logg('hello') // hello world
// logg('hello', 'china')   // hello china

// es6允许为函数设置默认值，直接写在参数定义的后面
// function log(x, y='world') {
//   console.log(x, y);
// }
// log('hello')  // hello world

// 使用参数默认值时，函数不能有同名函数。
// function foo (x, x, y) {
//   // 不报错
// }
// function foo (x, x, y=9) {
//   // 报错
// }

// let x = 9;
// function foo (p = x+1) {
//   console.log(p);
// }
// foo();
// x = 10;
// foo()
// foo()

// reset参数（...变量名），用于获取函数多余参数。变量是一个数组。
// reset参数和扩展运算符(...) 互为逆函数。...将一个数组转为用逗号分隔的参数序列
// 求和参数,可传入任意数目的值
// function add(...value) {
//   let sum = 0;
//   for (var val of value) {
//     sum = sum + val;
//   }
//   return sum;
// }
// console.log(add(2, 3, 4));

// 函数的length属性不包含reset参数。
// es5可以在函数内部设定严格模式，es6规定函数内部使用了默认值，解构赋值，或者扩展运算符
// 函数内部就不能设置严格模式

// var f = function() {}
// console.log(f.name)  // es6返回f

// 箭头函数
// var f = v => v;
// var f = function (v) {
//   return v;
// }

// 箭头函数的代码块多余一条语句使用大括号和return返回。
// var sum = (num1, num2) => {return num1 + num2};
// console.log(sum(2,3))
// var sum = (num, num1) => num + num1;
// console.log(sum(2,3))

// 1.箭头函数，this对象就是定义时所在的对象。而不是使用时所在的对象
// 2.不可以当做构造函数。也就是说不可以使用new命令，会报错
// 3.不可以使用arguments对象，不存在。可以用reset参数代替
// 4.不可以使用yield命令。

// 双冒号运算符。  用来取代显示绑定call，apply，bind的写法。
// :: 左边为对象，有点是一个函数，自动将左边的对象作为this对象，绑定到右边的函数上面


// 尾调用优化。 只在严格模式下开启，正常模式是无效的。

// 尾调用： 是函数式编程的一个重要概念，指某个函数的最后一步操作调用另一个函数。
// 优化： 即只保留内层函数的调用帧， 
// 如果所有函数都是尾调用，那么完全可以做到每次执行时，
// 调用帧只有一项，将大大节省内存，这就是“尾调用优化的意义”

// 尾递归
// 递归：函数调用自身就叫递归
// 尾递归：尾调用的时候调用自身，尾递归。
// 递归很耗内存，很容易发生“栈溢出”错误。

// 数组的扩展
// 扩展运算符，主要用于函数调用。
// console.log(...[1, 2, 3]);  // 1, 2, 3
// console.log(1, ...[2,3,4]);  // 1, 2, 3, 4

// 替代函数的apply方法
// function f(x,y,z) {
//   // ...
// }
// var args = [0,1,2];
// f.apply(null, args)

// // es6写法
// function f(x, y, z) {
//   // ...
// }
// let args = [1, 2, 3];
// f(...args);

// 不使用apply方法求数组最大值
// console.log(Math.max.apply(null, [2,8,13]))
// console.log(Math.max(...[2,8,13]))

// push方法的参数不能是数组,只好通过apply方法变通使用push方法。
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// Array.prototype.push.apply(arr1, arr2);
// console.log(arr1);
// arr1.push(...arr2);
// console.log(...arr1);

// 三类数据结构原生具备iterator接口， 数组，某些类似数组的对象。Set和Map结构，

// Array.from转化为数组
// 类似数组的对象和可遍历的对象（set和map）
// 什么是类似数组的对象？  就是有length属性。
// var list = 'hello'
// console.log(list.length)
// Array.from(list);
// console.log([list]);
// console.log(Array.from('hello'))

// Array.of 用于将一组值转化为数组，为了弥补Array构造函数的不足。
// 总数返回参数值组成的数组，如果没有参数，就返回一个空数组
// console.log(Array.of(1, 2, 3));

// copyWithin(),在当前数组内部，将指定位置的成员复制到其它位置，然后返回当前数组
// 0 从0开始替换数据，负值为倒数 3：从该位置开始读取数据，默认为0， 5：到该位置钱停止读取数据，默认等于数组长度
// console.log([1,2,3,4,5].copyWithin(0,2,5))  // 3,4,5,4,5


// 数组实例的find方法，找出第一个符合条件的数组成员，它的参数是一个回调函数，所有数组成员依次执行该回调函数
// 知道第一个返回值为true的成员。然后返回该成员，否则返回undefined。
// let num = [1, 2, 3, -5, 6].find( (n) => {return n < 0})
// console.log(num);
// find的回调函数可接受3个参数。依次为当前的值，当前的位置和原数组
// let num1 = [1,2,3,4,5,19,20].find( function (value, index, arr) {
//   return value > 9;
// })
// console.log(num1);

// findIndex(), 返回第一个符合条件值的位置,不符合条件则返回-1 

// let num2 = [1,2,3,7,9,10].findIndex( function (value, index, arr) {
//   return value > 9
// })
// console.log(num2);

// symbol类型
// const obj = {
//   toString() {
//     return 'abc'
//   }
// }
// const sym = Symbol(obj);
// console.log(sym)
// console.log(NaN === NaN)
// console.log(typeof Symbol)

// Set数据结构。 类似数组，但是成员的值是唯一的。没有重复的值。
// Set 本身是一个构造函数，用来生成Set数据结构
// 向Set加入值的时候，不会发生类型转换。5和‘5’是两个不同类型的值
// const arr = [1, 2, 3, '2', 4, 4]
// const set = new Set(arr)
// console.log(set);
// 数组去重
// function debu (array) {
//   return Array.from(new Set(array));
// }
// let a = debu([1,2,3,'3',4,4,5])
// console.log(a)


// for (let x of a) {
//   console.log(x);
// }

// Set结构可以很容易实现交集，并集，差集
// let a = new Set([1,2,3]);
// let b = new Set([4,2,3]);
// // 并集
// let union = new Set([...a, ...b])
// console.log(union)
// // 交集
// let interset = new Set([...a].filter(x => b.has(x)))
// console.log(interset)
// // 差集
// let difference = new Set([...a].filter(x => !b.has(x)))
// let difference2 = new Set([...b].filter(x => !a.has(x)))
// let d = new Set([...difference, ...difference2])
// console.log(d)  

// WeakSet结构，与set类似，也是不重复的值的集合。但是，它与Set有两个区别。
//  1.成员只能是对象。2.Weakset中的对象都是弱引用
// const foos = new WeakSet()
// class Foo {
//   constructor() {
//     foos.add(this)
//   }
//   method() {
//     if(!foos.has(this)) {
//       throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用')
//     }
//   }
// }

// Map，类似于对象，也是键值对的集合，但是“键”的范围不限于字符串。各种类型的值（包括对象）
// 都可以当做键，任何具有iterator接口的，且每个成员都是一个双元素的数组的数据结构。
// Object结构 “字符串--值”对应。 Map结构“值--值”的对应。是一种更加完美的Hash结构的实现。
// 如果你需要键值对的数据结构，Map比Object更合适。
// const m = new Map();
// const o = {
//   p: 'hello'
// }
// // Map的set方法，将o当做m的一个键
// m.set(o, 'content'); 
// // get读取这个键。
// console.log(m.get(o));
// 可接受数组作为参数。
// const map = new Map([
//   ['name', 'zhangsan'],
//   ['title', 'author']
// ])
// console.log(map.get('name'))

// 可用Set和Map来生成新的Map
// const set = new Set([
//   ['foo', 1],
//   ['bar', 2]
// ])
// const m1 = new Map(set);
// console.log(m1.get('foo'))
// const m2 = new Map([
//   ['bar', 3]
// ])
// const m3 = new Map(m2)
// console.log(m3.get('bar'))
// // 键值对，这个不是键值对。
// const m4 = new Map(1, 2, 3)
// console.log(m4)

// Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这也解决的同名属性的冲突。
// 如果Map的键是简单数据类型的值，（数字，字符串，布尔值），只要两个值严格相等。就当做一个键
// let map = new Map();
// map.set(-0, 12);
// console.log(map.get(0));

// map.set(true, 1);
// map.set('true', 2);
// console.log(map.get(true))

// Map转为数组
// const map = new Map().set(true, 7).set({foo: 3}, ['abc']);
// let m = [...map]
// console.log(...map);
 
// weakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名


// Proxy 用于修改某些操作的默认行为，等同于在语言层面作出修改。属于一种“元编程”，即对编程语言进行编程。
// 也可以理解为，在目标对象之前架设一层拦截。外界要访问，都要进过这层拦截。
// Proxy（代理），对外界的访问进行过滤和改写。

// 第一个参数是是所要代理的目标对象，
// 第二个参数是一个配置对象，用来定制拦截行为
// var proxy = new Proxy(target, handler);

// 拦截读取属性get。 
// var p = new Proxy( {}, {
//   // get方法的两个参数分别是目标对象和要访问的属性
//   get: function (target, pro) {
//     return 35;
//   }
// })
// 要使proxy起作用，必须对p实例进行操作。
// console.log(p.time);
// console.log(p.watch);
// get拦截属性的读取操作
// var person = {
//   name: '张三'
// }
// var proxy = new Proxy( person, {
//   get: function (tar, pro) {
//     if (pro in tar) {
//       return tar[pro]
//     } else {
//       throw new ReferenceError("pro is not exist.")
//     }
//   }
// })
// console.log(proxy.name)  // 张三
// console.log(proxy.age)   // prox is not exist.

// set拦截属性的赋值操作,4个参数，最后一个可选
// var validator = {
//   set: function(obj, prop, value) {
//     if (prop === 'age') {
//       if (!Number.isInteger(value)) {
//         // 类型错误
//         throw new TypeError('The age is not an integer');
//       }
//       if (value > 200) {
//         // 范围错误
//         throw new RangeError('The age seems invalid');
//       }
//     }
//     // 符合条件的直接保存
//     obj[prop] = value;
//   }
// };
// let person = new Proxy({}, validator);
// person.age = 100;
// console.log(person.age)

// 组合get和set做到防止外部读取内部属性
// const handler = {
//   get (target, key) {
//     invariant(key, 'get');
//     return target[key];
//   },
//   set (target, key, value) {
//     invariant(key, 'set');
//     target[key] = value;
//     return true;
//   }
// };
// function invariant (key, action) {
//   if (key[0] === '_') {
//     throw new Error(`Invalid attempt to ${action} private "${key}" property`)
//   }
// }
// const target = {};
// const proxy = new Proxy(target, handler);
// // console.log(proxy._por);
// console.log(proxy._pro = 'c')

// Reflect对象， es6为了操作对象而提供的api。


// var it = idMaker();

// it.next().value // 0
// it.next().value // 1
// it.next().value // 2
// // ...

// function idMaker() {
//   var index = 0;

//   return {
//     next: function() {
//       return {value: index++, done: false};
//     }
//   };
// }

// for of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。
// 一种数据结构只有部署了iterator接口，我们就称这种数据结构是“可遍历的”
// 默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，
// 一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）
// 凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口（比如数组）
// 原生具备 Iterator 接口的数据结构如下。
    // Array
    // Map
    // Set
    // String
    // TypedArray
    // 函数的 arguments 对象
    // NodeList 对象

// 对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，
// 哪个属性后遍历是不确定的，需要开发者手动指定

// for.. of 循环
// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，
// 就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。

// 数组。数组原生具备iterator接口（即默认部署了Symbol.iterator属性），
// for...of循环本质上就是调用这个接口产生的遍历器。
// const arr = ['red', 'green', 'blue'];
// for (let v of arr) {
//   console.log(v)
//   // red, green, blue
// }
// const obj = {};
// obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
// for(let v of obj) {
//   console.log(v);
//   // 通过对空对象部署数组的arr的Symbol.iterator属性，使之产生一样的属性。
// }

// for in 循环只能获得对象的键名，不能直接获取键值， for...of循环，允许遍历获得键值
// var arr = ['a', 'b', 'c', 'd'];
// arr.foo = 'hello'
// for (let a in arr) {
//   // console.log(a); // 0 1 2 3 foo
//   // console.log('a'); // a a a a a
// }
// for (let a of arr) {
//   console.log(a); // a b c d   只返回具有数字索引的属性。
// }

// for  of 获取键名，可以使用entries方法和keys方法。

// Set he Map 结构，具有原生Iterator接口。可以直接使用for..of循环
// Set遍历返回的是值，Map遍历返回的是一个数组。
// var eng = new Set(['ko', 'nt', 'kit', 'kit']);
// for (var e of eng) {
//   console.log(e)
// }
// // ko nt kit
// var es6 = new Map();
// es6.set('edition', 6);
// es6.set('commit', 'tc');
// es6.set('commit', 'tc');
// es6.set('standard', 'ecma-262');
// for (var name of es6) {
//   // console.log(name + ':' + value);    // edition:6  commit:tc standard:ecma-262
//   console.log(name)   // ['edition', 6] ['commit', 'tc'] ['standard', 'ecma-262']
// }

// 有些数据结构是在现有结构的基础上，计算生成的，比如，es6的数组，Set，Map都部署了

// entries： 返回一个遍历器对象，用来遍历[键名，键值]组成的数组，对于数组，键名就是索引值，
//           对于Set，键名与键值相同。Map结构的Iterator接口，默认就是entries方法。
// keys()返回一个遍历对象，用来遍历所有的键名
// values() 返回一个遍历对象，用来遍历所有的键值

// let arr = ['a', 'b', 'c'];
// for (let pair of arr.entries()) {
//   console.log(pair);
// }
// [0, 'a'] [1, 'b'] [2, 'c']

// 类似数组的对象
// 字符串
// let str = 'hello';
// for (let s of str) {
//   console.log(s); // h e l l o
// }
// DOM NodeList对象
// let paras = document.querySelectorAll('P');
// for (let p of para) {
//   p.classList.add('test')
// }
// arguments对象    “不定参”，用arguments来表示。不确定函数要传入几个参数
// function printArgs() {
//   for (let x of arguments) {
//     console.log(x);
//   }
// }
// printArgs('a', 'b');    // a b

// 不是所有类似数组的对象都具有Iterator接口， 可以使用Array.from方法转化为数组，
let arrayLike = {length: 2, 0: 'a', 1: 'b'};
for(let x of Array.from(arrayLike)) {
  console.log(x);
}