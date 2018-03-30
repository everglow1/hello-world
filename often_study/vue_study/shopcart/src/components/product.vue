<template>
  <div class="product">
    <h4>商品信息</h4>
    <table class="table table-hover table-bordered">
      <tr>
        <th>id</th>
        <th>名称</th>
        <th>价格</th>
        <th>操作</th>
      </tr>
      <tr v-for="shop in shoplist" :key="shop.index">
        <td>{{shop.id}}</td>
        <td>{{shop.name}}</td>
        <td>{{shop.price}}</td>
        <td>
          <div class="btn btn-info" @click="addToCart">加入购物车</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
export default {
  name: 'product',
  computed: {
    // console.log('nihao')
    shoplist() {
      return this.$store.getters.shoplist
    //   // console.log('nihao')
    // }
    // ...mapGetters(['shoplist'])
  },
  // created () {
  //   this.$store.dispatch()
  // }
},
methods : {
  addToCart() {
    
  }
}
}
</script>

<style>

</style>
