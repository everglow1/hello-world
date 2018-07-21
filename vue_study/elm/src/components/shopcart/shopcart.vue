<template>
  <div class="shopcart">
    <!-- 内容区 -->
    <div class="content">
      <!-- 内容左侧 -->
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hightlight': totalCount > 0}">
            <span class="icon-shopping_cart" :class="{'hightlight': totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'hightlight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <!-- 内容右侧 -->
      <div class="content-right">
        <!-- payClass计算属性返回两种状态的样式 -->
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
      <!-- 动画小球 -->
      <div class="ball-container">
        <transition-group name="drop">
          <div class="ball" v-for="(ball, index) in balls" :key="index" v-show="ball.show">
            <div class="inner"></div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /*
    * 选择的商品，从goods父组件传递
    * 购物车所有的状态变化，颜色高亮啊，内容变化啊，都跟这个selectFoods有关
    */
    selectFoods: {
      type: Array,
      // 当类型是数组或者对象时。如果知道默认值，应该为一个函数
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 小球数组定义
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    }
  },
  computed: {
    // 商品的总价
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total = total + food.price * food.count
      })
      console.log(total)
      return total
    },
    // 商品数量
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 支付价格,状态切换相关，三种状态(去结算，还差，多少起送)
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    // 样式转化计算属性，两种状态
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    // 小球动画, 传入elemnet
    drop (el) {
      console.log(el)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
    position fixed
    width 100%
    height 48px
    bottom 0
    left 0
    // 多出圆角，需要盖住menu
    z-index 50
    background #000
    .content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          box-sizing border-box
          top -10px
          padding 6px
          margin 0 12px
          width 56px
          height 56px
          vertical-align top
          border-radius 50%
          background #141d27
          &.hightlight
            background rbg(0, 160, 220)
          .logo
            width 100%
            height 100%
            // 内部元素水平居中
            text-align center
            border-radius 50%
            background #2b343c
            // 状态高亮的时候
            &.hightlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              // 设为父元素的height高度
              line-height 44px
              font-size 24px
              color #80858a
              &.hightlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          color rgba(255, 255, 255, 0.4)
          font-size 16px
          &.hightlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 12px
          color rgba(255, 255, 255, 0.4)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height  48px
          text-align center
          font-size 12px
          font-weight 700
          color rgba(255, 255, 255, 0.4)
          background #2b333b
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
      .ball-container
        .ball
        // 相对于视口做动画，fixed布局
          position fixed
          left 32px
          bottom 22px
          z-index 200
        .drop-transition
          transition all 0.4s
          // 小球
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            transition all 0.4s
</style>
