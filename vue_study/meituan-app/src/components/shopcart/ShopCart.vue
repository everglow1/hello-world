<template>
  <div>
    <!-- 底部购物车 -->
    <div class="shopcart">
      <!-- 左侧内容 -->
      <div class="content-left">
        <!-- :class="{'highligh': totalCount > 0}" (高亮设置有值，购物车样式会变化) -->
        <div class="logo-wrapper" :class="{'highligh': totalCount > 0}">
          <!-- @click="toggleList" 购物车详情页点击是否显示 -->
          <span class="icon-shopping_cart logo" :class="{'highligh': totalCount > 0}" @click="toggleList"></span>
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
      <!-- 购物车详情列表 -->
      <!-- v-show="listShow" 计算属性返回值，购物车详情是否显示  :class="{'show': listShow}" 绑定样式，列表展示才有该样式-->
      <div class="shopcart-list" v-show="listShow" :class="{'show': listShow}">
        <div class="list-top" v-if="poiInfoo.discounts2">
          {{poiInfoo.discounts2[0].info}}
        </div>
        <div class="list-header">
          <h3 class="title">一号口袋</h3>
          <div class="empty" @click="clearAll">
            <img src="./img/ash_bin.png">
            <span>清空购物车</span>
          </div>
        </div>
        <!-- 遍历添加进购物车数组的商品 -->
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food-item" v-for="(food, index) in selectFoodss" :key="index">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <!-- 因为有个也有例，有例的没有描述 要么显示个/例，否则显示描述-->
                  <p class="unit" v-show="!food.description">{{food.unit}}</p>
                  <p class="description" v-show="!food.unit">{{food.description}}</p>
                </div>
                <div class="desc-right">
                  ￥{{food.min_price}}
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :foodd="food"></CartControl>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>
    </div>
    <!-- 背部遮罩 需与整个购物车一个层级 -->
    <div class="shop-mask" @click="hiddenList" v-show="listShow"></div>
  </div>

</template>

<script>
// 引入滚动组件,需进行实例化
import BScroll from 'better-scroll'
// 引入CartControl组件
import CartControl from '../cartcontrol/CartControl'
export default {
  data () {
    return {
      // 购物车是否显示初始状态
      fold: true
    }
  },
  components: {
    CartControl
  },
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
    listShow () {
      // 判断个数是否为空, 如果为0 不展示列表
      if (!this.totalCount) {
        // eslint-disable-next-line
        this.fold = true
        return false
      }
      // 如果不为0 就展示列表
      let show = !this.fold
      // 滚动，需判断是否展示，
      if (show) {
        // 在dom渲染之后。
        this.$nextTick(() => {
          if (!this.shopScroll) {
            // eslint-disable-next-line
            this.shopScroll = new BScroll(this.$refs.listContent, {
              click: true,
              probeType: 3
            })
          } else {
            // 保存缓存的内容，刷新页面。
            this.shopScroll.refresh()
          }
        })
      }
      return show
    },
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
  },
  methods: {
    // 是否显示购物车详情页开关
    toggleList () {
      // 判断购物的的个数是否为空的
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    // 清空购物车
    clearAll () {
      this.selectFoodss.forEach((foo) => {
        foo.count = 0
      })
    },
    hiddenList () {
      this.fold = true
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
    .shopcart-list
      position absolute
      left 0
      top 0
      width 100%
      z-index -1
      &.show
        transform translateY(-100%)
      .list-top
        height 30px
        line-height 30px
        text-align center
        font-size 11px
        background #f3e6c6
        color #646158
      .list-header
        height 30px
        background #f4f4f4
        .title
          float left
          padding-left 6px
          line-height 30px
          border-left 4px solid #53c123
          font-size 12px
        .empty
          float right
          margin-right 10px
          line-height 30px
          font-size 0
          img
            height 14px
            margin-right 9px
            vertical-align middle
          span
            font-size 12px
            vertical-align middle
      .list-content
        max-height 217px
        overflow hidden
        background white
        .food-item
          height 38px
          padding 12px 12px 10px 12px
          border-bottom 1px solid #f4f4f4
          .desc-wrapper
            float left
            width 240px
            .desc-left
              float left
              width 170px
              .name
                margin-bottom 8px
                font-size 16px
                -webkit-line-clamp 1
                display -webkit-box
                -webkit-box-orient vertical
                overflow hidden
                height 16px
              .unit
                font-size 12px
                color #b4b4b4
              .description
                font-size 12px
                color #b4b4b4
                overflow hidden
                height 12px
          .desc-right
            float right
            width 70px
            text-align right
            .price
              font-size 12px
              line-height 38px
          .cartcontrol-wrapper
            float right
            margin-top 6px
  .shop-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background: rgba(7, 17, 27, 0.7)
</style>
