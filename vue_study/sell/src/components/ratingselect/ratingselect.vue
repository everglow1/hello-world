<template>
  <div class="ratingselect">
    <div class="ratingtype border-1px">
      <span @click="select(2)" class="block positive" :class="{'active': selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active': selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active': selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent === true}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// 定义3个常量
// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
// eslint-disable-next-line
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      // 数组和对象都要返回一个函数
      default() {
        return [];
      }
    },
    // 选择类型，总共有3中类型，定义了3种常量
    // eslint-disable-next-line
    selectType: {
      // 因为定义了常量，所以是数字类型， 为了可读性更强
      type: Number,
      default: ALL
    },
    // 读不读内容，false： 能看到所有的内容,看有内容的，或者不看有内容的
    onlyContent: {
      type: Boolean,
      default: false
    },
    // 描述，
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  methods: {
    select(type) {
      // if (!event._constructed) {
      //   return;
      // }
      // this.selectType = type;
      // 提交一个事件给父组件,通知给父组件
      // 第一个参数是父组件监听的事件名，不可用驼峰形式，只能小写或者-
      // 第二个参数为子组件的参数
      this.$emit('ratingtypeselect', type);
    },
    toggleContent() {
      // this.onlyContent = !this.onlyContent;
      // 提交一个事件给父组件,通知给父组件
      this.$emit('contenttoggle', this.onlyContent);
    }
  },
  computed: {
    // 通过计算属性返回动态的商品评价
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin";
  .ratingselect
    .ratingtype
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        display: inline-block
        padding: 8px 12px
        border-radius: 1px
        margin-right: 8px
        font-size: 12px
        line-height: 16px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          font-size: 8px
          margin-left: 2px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(0, 160, 220)
    .switch
      padding: 12px 12px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        font-size: 12px
</style>
