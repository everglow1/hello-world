<template>
  <div class="cart">
    <h4>已选商品</h4>
    <table>
      <tr>
        <th>id</th>
        <th>名称</th>
        <th>数量</th>
        <th>价格</th>
        <th>操作</th>
      </tr>
      <tr v-for="shop in cartProducts" :key="shop.id">
        <td>{{shop.id}}</td>
        <td>{{shop.name}}</td>
        <td>{{shop.num}}</td>
        <td>{{shop.price}}</td>
        <td>
          <div @click="delProduct(shop)" class="btn">删除</div>
        </td>
      </tr>
      <tr v-if="!cartProducts.length">
        <td class="text" colspan="5">您的购物车空空如也</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['cartProducts'])
  },
  methods: {
    ...mapActions(['delProduct'])
  }
}
</script>

<style>

</style>
