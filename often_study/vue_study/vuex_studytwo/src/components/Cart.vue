<template>
  <div class="cart">
    <h3>购物车列表</h3>
    <p v-show="!products.length"><i>请添加商品。。</i></p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{product.price}} X {{product.quantity}}
      </li>
    </ul>
    <p>Total: {{total}}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout{{checkoutStatus}}.</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: mapGetters({
    products: 'cartProducts',
    checkoutStatus: 'checkoutStatus',
    total: 'cartTotalPrice'
  }),
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products)
    }
  }
}
</script>

<style>

</style>
