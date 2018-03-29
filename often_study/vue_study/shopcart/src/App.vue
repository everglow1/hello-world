<template>
  <div id="app">
    <h4>购物车</h4>
    <!-- 商品列表 -->
    <product></product>
    <!-- 购物车列表 -->
    <cart></cart>
    <!-- 小记 -->
    <info></info>
  </div>
</template>

<script>
import cart from './components/cart'
import product from './components/product'
import info from './components/info'

export default {
  name: 'App',
  components: {
    info,
    product,
    cart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
