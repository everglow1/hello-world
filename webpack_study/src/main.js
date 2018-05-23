require('babel-runtime/regenerator')
require("./main.css")
require('./index.html')

var a = () => console.log('hello babel!')

var a = async () => {
  await console.log('hello')
  console.log('done')
}