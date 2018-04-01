<template>
  <div class="product">
    <h4>商品信息</h4>
    <table class="item-wrapper">
      <tr class="item">
        <th>id</th>
        <th>名称</th>
        <th>价格</th>
        <th>操作</th>
      </tr>
      <tr class="item" v-for="shop in shoplist" :key="shop.index">
        <td>{{shop.id}}</td>
        <td>{{shop.name}}</td>
        <td>{{shop.price}}</td>
        <td>
          <div class="btn btn-info" @click="addToCart(shop)">加入购物车</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'product',
  computed: {
  //   shoplist() {
  //     // 通过getters拿到store数据.
  //     return this.$store.getters.shoplist
  // },
  ...mapGetters(['shoplist'])
},
methods: {
  ...mapActions(['addToCart'])
}
}
</script>

<style lang="stylus" scoped>
  .table
    th
      text-align: center
    .item-wrapper
      display: inline
      background-color: #dfdfdf
      align-items: center
      justify-content: center
      .item
        flex: 1
</style>
