<template>
  <div id="app">
    <product-list-one ></product-list-one>
    <product-list-two></product-list-two>
  </div>
</template>

<script>
import ProductListOne from './components/ProductListOne'
import ProductListTwo from './components/ProductListTwo'

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components: {
    'ProductListOne':ProductListOne,
    'ProductListTwo':ProductListTwo
  }
}
</script>

<style>
  body {
    font-family: Ubuntu;
    color:#555;
  }
</style>
