<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decress" v-show="food.count > 0" @click.stop.prevent="decressCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    // 商品的添加和减少，都是关联这个food，从父级传入
    food: {
      type: Object
    }
  },
  created() {
    // console.log(this.food);
  },
  methods: {
    addCart() {
      // console.log('click');
      if (!this.food.count) {
        // 引入vue，利用vue的set方法设置一个名叫 count的属性，赋值为 1
        // 此时，food.count就能被观测到
        Vue.set(this.food, 'count', 1);
        // this.food.count = 1;
      } else {
        this.food.count++;
      }
      this.$emit('cartAdd', event.target);
    },
    decressCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size: 0
    .cart-decress
      display: inline-block
      padding: 6px
      transition: all 0.5s ease
      &.move-leave-active, &.move-enter-active
        transition: all 0.5s linear
      .move-enter, .move-leave-to
        transform: translate3d(24px, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotata(0)
      &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(0)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      font-size: 24px
      line-height: 24px
      padding: 6px
      color: rgb(0, 160, 220)
</style>
