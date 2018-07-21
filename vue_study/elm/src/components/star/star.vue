<template>
<!-- :class="starType"(渲染为：star-48/36/24)通过尺寸和分数计算出来的star类型个数 -->
  <div class="star" :class="starType">
    <!-- itemClass单个星星样式，动态的全星，半星，没有星 -->
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
// 定义常量，以后改动，只需改动此处，不需要去修改内容代码。编程常用技巧
const LENGTH = 5
// 与样式关联， on half off
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  // 接受外部传来的尺寸和分数
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      // 'star-'前缀拼凑出来样式
      return 'star-' + this.size
    },
    // 生成样式，为数组
    itemClasses () {
      let result = []
      // 向下取0.5的倍数
      let score = Math.floor(this.score * 2) / 2
      // 小数， 控制有多少个半星
      let hasDecimal = score % 1 !== 0
      // 整数, 有多少个全星
      let integer = Math.floor(score)
      // 循环
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 如果总共没有满5个的话
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
      // &.star-48(同一个class里面的另一个类名)
      // 当尺寸为48时，渲染这套星星
  .star-48
    .star-item
      width: 20px
      height: 20px
      margin-right 22px
      background-size 20px 20px
      // 最后一个没有尺寸
      &:last-child
        margin-right 0
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
  .star-36
    .star-item
      width: 15px
      height: 15px
      margin-right 6px
      background-size 15px 15px
      // 最后一个没有尺寸
      &:last-child
        margin-right 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  .star-24
    .star-item
      width: 10px
      height: 10px
      margin-right 3px
      background-size 10px 10px
      // 最后一个没有尺寸
      &:last-child
        margin-right 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>
