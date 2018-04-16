<template>
  <!-- 底部购物车 -->
  <div class="shopcart">
    <!-- 左侧内容 -->
    <div class="content-left">
      <div class="logo-wrapper">
        <span class="icon-shopping_cart logo"></span>
        <!-- Cartcontrol组件传过来的计算属性方法 -->
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <!-- Cartcontrol组件传过来的计算属性方法 -->
        <p class="total-price" v-show="totalPrice">￥{{totalPrice}}</p>
        <p class="tip">另需{{poiInfoo.shipping_fee_tip}}</p>
      </div>
    </div>
    <!-- 右侧内容 -->
    <div class="content-right">
      {{poiInfoo.min_price_tip}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    poiInfoo: {
      type: Object
    },
    // 接受goods组件传过来的数组方法，如果有东西，就放入return的数组
    selectFoodss: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
  // 计算购买总个数
    totalCount () {
      let num = 0
      // 遍历传过来的selectFoodss，拿到spus中的min_price
      this.selectFoodss.forEach((foodd) => {
        num = num + foodd.count
      })
      return num
    },
    // 计算总的价钱
    totalPrice () {
      let total = 0
      this.selectFoodss.forEach((foodd) => {
        total = total + foodd.min_price * foodd.count
      })
      return total
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
    display flex
    position fixed
    width 100%
    height 51px
    left 0
    bottom 0
    z-index 90
    background #514f4f
    .content-left
      flex 1
      .logo-wrapper
        float left
        position relative
        width 50px
        height 50px
        top -14px
        left 10px
        text-align center
        border-radius 50%
        background #666666
        .logo
          line-height 50px
          font-size 28px
          color #c4c4c4
      .desc-wrapper
        float left
        margin-left 13px
        .tip
          line-height 51px
          font-size 12px
          color #bab9b9
    .content-right
      flex 0 0 110px
      line-height 51px
      font-weight bold
      font-size 15px
      text-align center
      color #bab9b9
</style>
