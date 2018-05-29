new Promise (function (resolve, reject) {
  resolve(2)
  // console.log(resolve(1))   // undefined
  console.log(1)
  new Promise(function (resolve, reject) {
    resolve(4)
    console.log(5)
  }).then(console.log)
}).then(console.log)
console.log(3)