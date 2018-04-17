<template>
  <!-- 底部购物车 -->
  <div class="shopcart">
    <!-- 左侧内容 -->
    <div class="content-left">
      <!-- :class="{'highligh': totalCount > 0}" (高亮设置有值，购物车样式会变化) -->
      <div class="logo-wrapper" :class="{'highligh': totalCount > 0}">
        <span class="icon-shopping_cart logo" :class="{'highligh': totalCount > 0}"></span>
        <!-- Cartcontrol组件传过来的计算属性方法 -->
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper" >
        <!-- Cartcontrol组件传过来的计算属性方法 -->
        <p class="total-price" v-show="totalPrice">￥{{totalPrice}}</p>
        <p class="tip" :class="{'highligh': totalCount > 0}">另需{{poiInfoo.shipping_fee_tip}}</p>
      </div>
    </div>
    <!-- 右侧内容 -->
    <div class="content-right" :class="{'highligh': totalCount > 0}">
      <!-- {{poiInfoo.min_price_tip}} -->
      {{pay}}
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
    // selectFoods里面是json中的spus
    /*
    * 点击加号，会触发goods组件中的计算属性，遍历整个商品列表，发现count值大于1，就把值放入selectFoods数组中，
    * 在goods组件绑定了selectFoodss，通过属性传值，返回到购物车组件selectFoodss中
    */
    selectFoodss: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
  // 从selectFoodss中计算购买总个数，父组件Goods传递过来的
    totalCount () {
      let num = 0
      // 遍历传过来的selectFoodss，拿到spus中的min_price shop自定义返回的元素名
      this.selectFoodss.forEach((shop) => {
        num = num + shop.count
      })
      return num
    },
    // 计算总的价钱
    totalPrice () {
      let total = 0
      this.selectFoodss.forEach((shop) => {
        total = total + shop.min_price * shop.count
      })
      return total
    },
    // 去结算的样式属性
    pay () {
      if (this.totalCount > 0) {
        return '去结算'
      } else {
        return this.poiInfoo.min_price_tip
      }
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
        /* 注意绑定样式的写法 */
        &.highligh
          background #ffd161
        .logo
          line-height 50px
          font-size 28px
          color #c4c4c4
          &.highligh
            color #2d2b2a
        .num
          position absolute
          width 15px
          height 15px
          right 0
          top 0
          line-height 15px
          font-size 9px
          border-radius 50%
          color white
          background red
      .desc-wrapper
        float left
        margin-left 13px
        .total-price
          line-height 33px
          font-size 18px
          color white
        .tip
          line-height 51px
          font-size 12px
          color #bab9b9
          &.highligh
            line-height 12px
    .content-right
      flex 0 0 110px
      line-height 51px
      font-weight bold
      font-size 15px
      text-align center
      color #bab9b9
      &.highligh
        background #ffd161
        color #2d2b2a
</style>
