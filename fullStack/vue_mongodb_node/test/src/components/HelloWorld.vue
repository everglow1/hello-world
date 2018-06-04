<template>
  <div>
    <input class="form-control" type="text" id="inputEmail3" placeholder="请输入账号" v-model="account">
    <input class="form-control" type="password" id="inputPassword3" placeholder="请输入密码" v-model="password">
    <button class="btn btn-default" @click="login" type="submit">登录</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      // 获取已有账号密码
      this.axios.get('/api/login/getAccount')
        .then((response) => {
          // 响应成功回调
          console.log(response)
          let params = {
            account: this.account,
            password: this.password
          }
          // 创建一个账号密码
          return this.$http.post('/api/login/createAccount', params)
        })
        .then((response) => {
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
