<template>
  <div class="info">
    <div class="item-wrapper">
      <div class="item">总数：{{totalNum}}</div>
      <div class="item">总价：{{totalPrice}}</div>
      <div class="item" @click="clearAllCart">清空购物车</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'info',
  computed: {
    ...mapGetters(['totalPrice', 'totalNum'])
  },
  methods : {
    ...mapActions(['clearAllCart'])
  }
}
</script>

<style lang="stylus" scoped>
  .item-wrapper
    display flex
    // overflow hidden
    align-items center
    justify-content center
    border 1px solid #cccccc
    .item
      flex 1
</style>
