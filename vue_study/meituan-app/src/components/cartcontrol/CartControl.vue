<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- v-show="foodd.count"有值显示，不然不显示 -->
      <div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="foodd.count"></div>
    </transition>
    <div class="cart-count" v-show="foodd.count > 0">{{foodd.count}}</div>
    <div class="cart-add icon-add_circle" @click="increaseCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
// 引入vue是为了使用它的一个set方法
import Vue from 'vue'
export default {
  props: {
    foodd: {
      type: Object
    }
  },
  methods: {
    // 减少加商品
    decreaseCart () {
      this.foodd.count--
    },
    // 添加商品
    increaseCart () {
      if (!this.foodd.count) {
        // vue的set方法，因为json数据中没有count属性，只好自己设置一个
        // 创建一个不存在的属性，用set方法 该方法传3个值
        // 1.要添加的对象，2.添加的key，3.添加的value
        Vue.set(this.foodd, 'count', 1)
      } else {
        this.foodd.count++
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      width 26px
      height 26px
      font-size 26px
      color #b4b4b4
    .move-enter-active, .move-leave-active
      /* all:针对所有元素，linear：匀速*/
      transition all 0.5s linear
    .move-enter, .move-leave-to
      /* translateX(20px),定义转换，只是用 X 轴的值。*/
      /* rotate(180deg) 定义2D旋转，在参数中规定角度。*/
      transform translateX(20px) rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      line-height 26px
      width 25px
      text-align center
      font-size 12px
    .cart-add
      display inline-block
      position relative
      width 26px
      height 26px
      font-size 26px
      color #ffd161
      .bg
        position absolute
        width 20px
        height 20px
        left 3px
        top 3px
        z-index -1
        border-radius 50%
        background black
</style>
