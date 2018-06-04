const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/test')

// 为连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

// 定义loginSchema
const loginSchema = mongoose.Schema({
  account: String,
  password: String
})

// 定义模型Model
const Models = {
  Login: mongoose.model('Login', loginSchema)
}

module.exports = Models
