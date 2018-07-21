<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count > 0" @click="decCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    // 关联单个food，例：food.count，food.price  从goods组件传入
    food: {
      type: Object
    }
  },
  created () {
  },
  methods: {
    // 添加商品
    addCart (event) {
      // 解决pc端点击出现两次问题
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        // 给不存在的值添加属性，需要使用Vue的set方法，设置参数名和值
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 在添加商品的时候，添加一个事件‘cart.add’， 并将event.target作为参数传递给goods组件
      this.$emit('cartAdd', event.target)
    },
    // 减少商品数量
    decCart (event) {
      // 解决pc端点击出现两次问题
      if (!event._constructed) {
        return
      }
      this.food.count--
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size 0
    .fade-transition
      opacity 1
      transform translate3d(0, 0, 0)
    .fade-enter-active, .fade-leave-active
      opacity 0 .5s
      transform translate3d(24px, 0, 0)
    .fade-enter, .fade-leave-to
      opacity 0
    .cart-decrease
      display inline-block
      padding 6px
      transition all 0.4s linear
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
        transform rotate(0)
    .fade-enter, .fade-leave
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>
