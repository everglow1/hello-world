<template>
  <div class="login">
    <p class="header">管理员</p>
    <div class="demo-input-size">
      <el-input type="text" v-model="username" placeholder="请输入账号"></el-input>
      <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
    </div>
    <el-row>
      <el-button type="primary" plain @click="loginAccount">登录</el-button>
      <el-button type="primary" plain @click="createAccount">注册</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Logina',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginAccount() {
      alert('登录成功')
      this.$router.push({path: '/admin'})
    },
    createAccount() {
      alert('注册成功,请登录')
    }
  }
}
</script>

<style scoped>
  .header {
    font-size: 20px;
  }
  .el-input {
    font-size: 20px;

  }
  .el-row {
    margin-top: 20px;
  }
</style>
