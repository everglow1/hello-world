<template>
  <transition name="food-detail">
    <!-- 图片部分 -->
    <!-- v-show="showFlag" （不直接展示这个页面） -->
    <div class="fooddetail" v-show="showFlag">
      <div class="food-wrapper">
        <div class="food-content">
          <div class="img-wrapper">
            <img :src="selectFoods.picture" alt="大图" class="food-img">
            <span class="close-bt icon-close" @click="closeDetail"></span>
            <img class="share-bt" src="./img/share.png"/>
            <img class="more-bt" src="./img/more.png"/>
          </div>
          <!-- 中间部分商品部分细节部分 -->
          <div class="content-wrapper">
            <h3 class="name">{{selectFoods.name}}</h3>
            <p class="saled">{{selectFoods.month_saled_content}}</p>
            <img :src="selectFoods.product_label_picture" alt="网友推荐" class="product" v-show="selectFoods.product_label_picture"/>
            <p class="price">
              <span class="text">￥{{selectFoods.min_price}}</span>
              <span class="unit">/{{selectFoods.unit}}</span>
            </p>
            <!-- 选规格 -->
            <!-- 引入加减符号组件 -->
            <div class="cartcontrol-wrapper">
              <!-- selectFoods传递给子组件，让其加减操作 -->
              <CartControl :foodd="selectFoods"></CartControl>
            </div>
            <!-- 利用样式遮住加减组件 -->
            <!-- !selectFoods.count || selectFoods.count === 0 (这两种情况显示选规格) -->
            <div class="buy" v-show="!selectFoods.count || selectFoods.count === 0" @click="addProduct">
              选规格
            </div>
          </div>
        </div>
   
      </div>
    </div>
  </transition>
</template>

<script>
// 为了点击选规格时，添加一个商品给购物车，引入vue组件
import Vue from 'vue'
// 引入加减符号组件
import CartControl from '../cartcontrol/CartControl'
export default {
  data () {
    return {
      // 为了不直接展示详情页面。设置一个v-show
      showFlag: false
    }
  },
  props: {
    // 从Goods组件获得的数据
    selectFoods: {
      type: Object
    }
  },
  components: {
    CartControl
  },
  methods: {
    showView () {
      // 通过Goods组件点击，更改此状态，即父组件调用子组件的方法
      this.showFlag = true
    },
    // 关闭详情页
    closeDetail () {
      this.showFlag = false
    },
    // 点击选规格时，添加一个商品给购物车
    addProduct () {
      // 使用vue自带的set方法，把count加入selectFoods，并赋值为1
      Vue.set(this.selectFoods, 'count', 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
    // 动画效果，注意样式对齐。
  .food-detail-enter-active, .food-detail-leave-active
    transition 0.8s
  .food-detail-enter, .food-detail-leave-to
    transform translateX(100%)
  .fooddetail
    position fixed
    width 100%
    left 0
    top 0
    bottom 51px
    z-index 50
    background white
    .img-wrapper
      position relative
      width 100%
      height 0
      // 生成一个正方形
      padding-top 100%
      .food-img
        position absolute
        width 100%
        height 100%
        left 0
        bottom 0
      .close-bt
        position absolute
        width 30px
        height 30px
        left 10px
        top 10px
        text-align center
        font-size 30px
        color white
        background #7f7f7f
        border-radius 50%
      .share-bt, .more-bt
        position absolute
        width 30px
        height 30px
        top 10px
      .share-bt
        right 50px
      .more-bt
        right 10px
    .content-wrapper
      position relative
      padding 0 0 16px 16px
      .name
        line-height 30px
        font-size 15px
        font-weight bold
        color #333333
      .saled
        font-size 11px
        margin-bottom 6px
      .product
        height 15px
        margin-bottom 16px
      .price
        font-size 0
        .text
          font-size 17px
          color #fb4e44
        .unit
          font-size 11px
          color #9d9d9d
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 10px
      padding 2px
      // 利用样式遮住加减组件
    .buy
      position absolute
      width 64px
      height 30px
      right 12px
      bottom 10px
      line-height 30px
      text-align center
      border-radius 30px
      background #ffd161
</style>
