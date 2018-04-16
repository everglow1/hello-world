<template>
  <div class="star">
    <!-- 一个span遍历5个， 动态绑定class，为了更改哪个星是全部的，哪个是半个的什么的 itemClass来源于我们v-for遍历过来的 -->
    <!-- key绑定为了虚拟dom更好的渲染 -->
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
// 长度
const LENGTH = 5
// 状态 ，会push到数组中
// 全星
const CLS_ON = 'on'
// 半星
const CLS_HALF = 'half'
// 无星
const CLS_OFF = 'off'
export default {
  props: {
    scoree: {
      type: Number
    }
  },
  computed: {
    itemClasses () {
      let result = []
      // 4.7分 ,进行数学算法，等于4.5
      // Math.floor 求一个最接近它的整数,对浮点数向下取整
      let scoree = Math.floor(this.scoree * 2) / 2
      // 半星 ，有小数的分数，为半星
      // 将上面scoree   scoree % 1 !== 0（scoree 对1进行取余，不等于0，代表有小数）
      let hasDecimal = scoree % 1 !== 0
      // 全星
      let integer = Math.floor(scoree)
      // 遍历全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 半星处理
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 算星星总的状态，用while（因为不知有几个）While 循环会在指定条件为真时循环执行代码块。
      // 在数组的长度小于5时，一直循环执行
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  .star
    font-size 0
    .star-item
      display inline-block
      width 10px
      height 10px
      margin-right 3px
      background-repeat no-repeat
      background-size 10px 10px
      &:last-child
        margin-right 0
      /* 三种图片类型 */
      &.on
        background-image: url(img/star24_on@2x.png)
      &.half
        background-image: url(img/star24_half@2x.png)
      &.off
        background-image: url(img/star24_off@2x.png)
</style>
