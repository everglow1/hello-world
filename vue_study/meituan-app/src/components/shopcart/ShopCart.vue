<template>
  <!-- 底部购物车 -->
  <div class="shopcart">
    <!-- 左侧内容 -->
    <div class="content-left">
      <div class="logo-wrapper">
        <span class="icon-shopping_cart logo"></span>
      </div>
      <div class="desc-wrapper">
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
