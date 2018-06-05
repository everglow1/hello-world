// 连接数据库文件
const mongoose = require('mongoose')
// 连接数据库，如果自己不创建，默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test')

// 为这次连接绑定事件
// connection是mongoose模块的默认引用，返回一个Connetion对象。因为connect()方法并不能监听数据库连接情况
// 所以，一般情况下此方法跟connet()方法搭配使用
const db = mongoose.connection
db.once('error', () => console.log('mongodb connect error'))
db.once('open', () => console.log('mongodb connect successed'))

// 定义模式loginSchema
const loginSchema = mongoose.Schema({
  account: String,
  password: String,
  newpassword: String
}, {
  collection: 'listData'
}
)
// 定义模型model
const Models = {
  Login: mongoose.model('Login', loginSchema)
}
module.exports = Models