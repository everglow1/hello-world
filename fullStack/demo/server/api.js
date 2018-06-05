// 具体接口文件
const models = require('./db').Login
const express = require('express')
const router = express.Router()

// 创建， 读取， 更新， 删除
// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models({
    account: req.body.account,
    password: req.body.password
  })
  // 查询该账号是否已经被注册
  models.count({'account': newAccount.account}, (err, docs) => {
    if (err) {
      console.log('Error:' + err)
      res.send(err)
    } else {
        if (docs >= 1) {
          // 账号已经被注册，注册失败，返回code = 2
          console.log('注册失败')
          res.send({code: 2, msg: '账号已经存在，不能再次注册'})
        } else {
          // 账号未被注册，保存数据newAccount进mongodb，注册成功，返回 code=1
          newAccount.save((err, data) => {
            if (err) {
              res.send(err)
            } else {
              console.log('注册成功')
              res.send({code: 1, msg: '账号创建成功'})
            }
          })
        }
    }
  })
});
// 删除账号接口
router.post('/api/login/deleteAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')  
  // 查询该账号是否已经注册
  models.count({'account': req.body.account}, (err,docs) => {
    if(err) {
      console.log('error:' + err)
      res.send(err)
    } else {
        if(docs >= 1) {
          // 若注册，在mongodb中删除该条数据，返回code = -1
          models.remove({'account': req.body.account}, (req, res) => {
            if(err) {
              return handleError(err)
            }
          })
          console.log('删除成功')
          res.send({code: -1, msg: '账号已被删除'})
        } else {
          // 若还未注册，删除是被，范湖code = -2
          console.log('删除失败')
          res.send({code: -2, msg: '账号还未注册，不能删除'})
        }
    }
  })
});
// 登录接口
router.post('/api/login/loginAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser') 
  let newAccount = new models({
    account: req.body.account,
    password: req.body.password
  })
  console.log('login:' + req.body.account)
  console.loh(newAccount)
  // 查询账号是否已经存在
  models.findOne({'account': req.body.account}, (err, docs) => {
    if(err) {
      console.log('Error:' + err)
      res.send(err)
    } else {
      console.log('Docs:' + docs)
      if(!docs == '') {
        // 若存在，再验证账号密码是否正确
        if(docs.account === newAccount.account && docs.password === newAccount.password) {
          // 登录成功，返回code 1
          console.log('登录成功')
          res.send({code: 1, msg: '登录成功'})
        } else {
          // 登录失败，密码错误， 返回 code = -1
          console.log({status: '登录失败', msg: '密码错误'})
          res.send({code: -1, msg: '密码错误，请重新输入'})
        }
      } else {
        // 若不存在。登录失败，返回code = -2
        console.log({status: '登录失败', msg: '账号不存在'})
        res.send({code: -2, msg: '账号不存在，请先注册账号'})
      }
    }
  })
});
// 更新密码接口
router.post('/api/login/updatedAccount', (req, res) => {
  let newAccount = new models({
    account: req.body.account,
    password: req.body.password,
    newPassword: req.body.newPassword
  })
  console.log('login:' + req.body.account)
  console.log(newAccount)
  // 查询该账号是否存在
  models.findOne({'account': req.body.account}, (err, docs) => {
    if (err) {
      console.log('Error:' + err)
      res.send(err)
    } else {
      cons.log('Docs:' + docs)
      let currId = docs._id
      if (!docs == '') {
        // 若存在，再验证账号和密码是否正确
        if(docs.account === newAccount.account && docs.password === newAccount.password) {
          // 登录成功
          console.log('登录成功')
          // 判断新密码是否与旧密码一致，
          if (docs.password === newAccount.newPassword) {
            // 更新密码失败，新密码和旧密码一致，不能修改，返回code = -1
            res.send({code: -1, msg: '修改密码是被，新密码不能和旧密码一致'})
          } else {
            models.update({_id: currId}, {password: newAccount.newPassword}, (err) => {
              if (err) {
                console.log(err)
              } else {
                console.log('更新密码成功')
                res.send({code: 1, msg: '密码更新成功'})
              }
            })
          }
        } else {
          // 更新密码失败，密码错误，返回 code= -2
          console.log({status: '更新密码失败', msg: '密码错误'})
          res.send({code: -2, msg: '登录密码错误，不能修改密码'})
        }
      } else {
        // 若不存在，登录失败，更新密码是被，返回code = -3
        console.log({status: '登录失败', msg: '账号不存在'})
        res.send({code: -3, msg: '账号不存在，先注册账号'})
      }
    }
  })
});
module.exports = router
