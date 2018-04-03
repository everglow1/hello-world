<template>
  <div id="app">
    <!-- 头部 -->
    <nodeheader></nodeheader>
    <!-- <router-link to="./nodearticle">nodearticle</router-link> -->
    <!-- 主要内容区 -->
    <router-view name="main"/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import nodeheader from './components/nodeheader'
export default {
  name: 'App',
  components: {
    nodeheader
  }
}
</script>

<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
