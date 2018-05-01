// 数组去重。  对Object的使用，利用key来进行筛选。
// var arr =  [1,13,24,11,14,2,2,3,13];
// let unique = function (arr) {
//   let hashTable = {};
//   let data = [];
//   for (let i = 0, l = arr.length; i < l; i ++) {
//     if (!hashTable[arr[i]]) {
//       hashTable[arr[i]] = true;
//       data.push(arr[i]);
//     }
//   }
//   return data;
// }
// console.log(unique(arr))

// 冒泡排序   冒泡排序算法就是依次比较大小，小的和大的进行位置上的交换。
// 冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，
// 如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，
// 也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
// function  bubbleSort (arr) {
//   var len = arr.length;
//   for (var i = 0; i < len -1; i ++) {
//     for (var j = 0; j < len - 1 - i; j ++) {
//       // 相邻元素对比
//       if (arr[j] > arr[j + 1]) {
//         // 如果前一个比后一个大，就交换
//         var temp = arr[j + 1];
//         arr[j + 1] = arr[j];
//         arr[j] = temp;
//       }
//     }
//   }
//   return arr;
// }
// var arr = [3, 9, 90, 20, 8, 2, 4, 56];
// console.log(bubbleSort(arr));

// 不借助零时变量进行两个数交换。
// function swap (a, b) {
//   b = b - a;
//   a = a + b;
//   b = a - b;
//   return [a, b];
// }
// console.log(swap(2, 3));

// 找出正数组的最大值
// function Num (arr) {
//   var max = Math.max.apply(null, arr);
//   var min = Math.min.apply(null, arr);
//   return max, min;
// }
// var arr = [49, 10, 8];
// console.log(Num(arr))

// 随机生成指定长度的字符串
function randomString(n) {  
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
  let tmp = '',
      i = 0,
      l = str.length;
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l));
  }
  return tmp;
}
console.log(randomString(3))
 
