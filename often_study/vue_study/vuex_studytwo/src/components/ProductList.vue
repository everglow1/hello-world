<template>
  <div class="productlist">
    I am productlist
    <ul>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{product.price}}
        <br>
        <button :disabled="!product.inventory" @click="addProductToCart(product)">Add To Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: mapGetters({
    // debug 这种写法，不会导致 products没有定义
    products: 'allProducts'
  }),
  methods: {
    ...mapActions(['addProductToCart'])
  },
  // 一般可以在created函数中调用ajax获取页面初始化所需的数据。
  // vue实例被生成之后调用created
  created () {
    // 分发action
    this.$store.dispatch('getAllProducts')
    console.log('created分发actions')
  }
}
</script>

<style lang="stylus" scoped>
  ul
    list-style none
</style>
