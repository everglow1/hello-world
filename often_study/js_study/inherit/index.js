// 原型继承  将父类的实例作为子类的原型
// function Cat() {

// }
// Cat.prototype.name = 'cat';

// var cat = new Cat();
// console.log(cat.name);  // cat

// 构造继承
// function Cat(name) {
//   this.name = name || 'tom'
// }
// var cat = new Cat()
// console.log(cat.name)

// 组合继承  js中最常用的继承模式 
// 使用原型链继承共享属性和方法，
// 使用构造函数继承实例属性
function Super(name) {
  this.name = name;
  this.colors = ['red', 'black', 'green'];
}
Super.prototype.sayName = function () {
  console.log(this.name);
}
function Sub (name, age) {
  // 继承属性
  Super.call(this, name)
  // 定义自己的属性age
  this.age = age;
}
Sub.prototype = new Super();
// Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function () {
  console.log(this.age)
}
var instance1 = new Sub('niko', 19);
instance1.colors.push('blue');

