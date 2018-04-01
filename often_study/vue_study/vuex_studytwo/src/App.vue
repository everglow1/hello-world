<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld/> -->
    <!-- 商品列表 -->
    <productlist></productlist>
    <!-- 购物车列表 -->
    <cart></cart>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import productlist from './components/ProductList'
import cart from './components/cart'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    productlist,
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
