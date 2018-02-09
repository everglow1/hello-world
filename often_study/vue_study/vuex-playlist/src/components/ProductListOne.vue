<template>
  <div id="product-list-one">
    <h2>Product List One</h2>
    <ul>
      <li v-for="product in saleProducts" 
          :key="product.name">
          <span class="name">{{product.name}}</span>
          <span class="price">${{product.price}}</span>
      </li>
    </ul>
    <button @click="reducePrice(4)">商品降价</button>
  </div>
</template>

<script> 
import {mapGetters,mapActions} from 'vuex'

export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
  ...mapGetters([
    "saleProducts"
  ])
  },
  methods: {
    ...mapActions([
      "reducePrice"
    ])
    // reducePrice: function (amount) {
    //   // this.$store.state.products.forEach(productt => {
    //   //   productt.price -= 1;
    //   // })
    //   // this.$store.commit('reducePrice')

    //   // this.$store.dispatch('reducePri',amount)
    // }
  }
}
</script>

<style scoped>
  #product-list-one {
    background: #fff8b1;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
  }
  #product-list-one ul {
    padding: 0;
  }
  #product-list-one ul li {
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255,255,255,0.7);
  }
  .price {
    font-weight: bold;
    color: #e8800c;
  }
</style>
