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
      checked: ''
    }
  },
  methods: {
    loginAccount () {
      console.log('登录')
      
    },
    createAccount () {
      console.log('注册')
    },
    deleteAccount () {
      console.log('删除')
    },
    updateAccount () {
      console.log('修改')
    }
  }
}
</script>

<style>

</style>
