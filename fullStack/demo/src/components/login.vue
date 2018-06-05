<template>
  <div class="login">
    <p class="title">登录</p>
    <div class="input">
      <input type="text" v-model="username" placeholder="请输入账号"/>
      <input type="password" v-model="password" placeholder="请输入密码"/>
      <input type="password" v-model="newPassword" placeholder="新密码"/>
    </div>
    <div class="radio">
      <input type="radio" v-model="checked" class="remember">记住密码</input>
    </div>
    <div class="btn">
      <button type="button" @click="loginAccount">登录</button>
      <button type="button" @click="createAccount">注册</button>
      <button type="button" @click="deleteAccount">删除</button>
      <button type="button" @click="updateAccount">修改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      newPassword: '',
      // rules: {
      //   username: [
      //     {required: false, message: '请输入账号', trigger: 'blur'}
      //   ],
      //   password: [
      //     {required: false, message: '请输入密码', trigger: 'blur'}
      //   ],
      //   newPassword: [
      //     {required: false, message: '请输入新密码', trigger: 'blur'}
      //   ]
      // },
      checked: false
    }
  },
  methods: {
    loginAccount () {
      // console.log('登录')
      let params = {
        account: this.username,
        password: this.password
      }
      if (params.account === '' || params.password === '') {
        alert('账号和密码不能为空')
        return false
      }
      this.$http.post('/api/login/loginAccount', params)
        .then((response) => {
          let res = response.data
          console.log(res)
          alert('res.msg')
          if (res.code == 1) {
            // 跳转到home页面
            this.$router.push({ path: '/home'})
          }
        })
          .catch((reject) => {
            console.log(reject)
          })
    },
    createAccount () {
      // console.log('注册')
      let params = {
        account: this.username,
        password: this.password
      }
      if (params.account === '' || params.password === '') {
        alert('账号和密码不能为空')
        return false
      }
      console.log(params)
      this.$http.post('/api/login/createAccount', params)
      .then((response) => {
        let res = response.data
        console.log(res)
        alert(res.msg)
      })
      .catch((reject) => {
        console.log(reject)
      })
    },
    deleteAccount () {
      // console.log('删除')
      let params = {
        account: this.username,
        password: this.password
      }
      if (params.account === '' || params.password === '') {
        alert('账号和密码不能为空')
        return false
      }
      console.log(params)
      this.$http.post('/api/login/deleteAccount', params)
      .then((response) => {
        let res = response.data
        console.log(res)
        alert(res.msg)
      })
      .catch((reject) => {
        console.log(reject)
      })
    },
    updateAccount () {
      // console.log('修改')
      let params = {
        account: this.username,
        password: this.password,
        newPassword: this.newPassword
      }
      if (params.account === '' || params.password === '') {
        alert('账号和密码不能为空')
        return false
      }
      if (params.newPassword === '') {
        alert('新密码不能为空')
        return false
      }
      this.$http.post('/api/login/updatedAccount', params)
        .then((response) => {
          let res = response.data
          console.log(res)
          alert(res.msg)
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>

<style>

</style>
