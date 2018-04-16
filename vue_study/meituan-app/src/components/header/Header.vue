<template>
  <div class="header">
    <!-- 顶部通栏 开始 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="serach-wrapper">
        <span class="serach-icon"></span>
        <!-- <img src="./img/search.png" alt=""> -->
        <input type="text" class="serach-bar" placeholder="搜索店内商品"/>
      </form>
      <div class="more-wrapper">
        <a href="#" class="spelling-bt">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>
    <!-- 主题内容 开始 -->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
        <!-- <img :src="poiInfoo.pic_url" alt=""> -->
      </div>
      <div class="name">
        <h3>{{poiInfoo.name}}</h3>
      </div>
      <div class="collect">
        <img src="./img/star.png" alt="收藏">
        <span>收藏</span>
      </div>
    </div>
    <!-- 公告内容 开始 -->
    <div class="bulletion-wrapper">
      <!-- v-if 判断是否有这个，因为有的有，有的没有，不判断显示，会报错 -->
      <img :src="poiInfoo.discounts2[0].icon_url" v-if="poiInfoo.discounts2" class="icon">
      <span class="text" v-if="poiInfoo.discounts2">{{poiInfoo.discounts2[0].info}}</span>
      <div class="detail" v-if="poiInfoo.discounts2" @click="showBulletin">
        {{poiInfoo.discounts2.length}}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!-- 背景 开始 -->
    <!-- computed属性 绑定 style中的head_pic_url为了图片不拉伸，不压缩。 让它为背景图绑定 -->
    <div class="bg-wrapper" :style="head_pic_url">
      <!-- <img :src="poiInfoo.head_pic_url" alt="背景图片"/> -->
    </div>
    <!-- 公告详情开始 -->
    <transition name="bulletin-detail">
      <!-- isShow绑定到data中。 -->
      <div class="bulletion-detail" v-show="isShow">
        <div class="detail-wrapper">
          <!-- 容器内容 -->
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfoo.name}}</h3>
            <!-- 星级评价 -->
            <div class="score">
              <app-star :scoree="poiInfoo.wm_poi_score"></app-star>
              <span>{{poiInfoo.wm_poi_score}}</span>
            </div>
            <p class="tip">
              {{poiInfoo.min_price_tip}}<i>|</i>{{poiInfoo.shipping_fee_tip}}<i>|</i>{{poiInfoo.delivery_time_tip}}
            </p>
            <p class="time">
              配送时间：{{poiInfoo.delivery_time_tip}}
            </p>
            <div class="discounts" v-if="poiInfoo.discounts2">
              <p>
                <img :src="poiInfoo.discounts2[0].icon_url" alt="优惠图标">
                <span>{{poiInfoo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <!-- 关闭容器内容 -->
          <div class="close-wrapper">
            <span class="icon-close" @click="closeBulletin"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '../star/Star.vue'
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    // app.vue 组件传过来的值
    poiInfoo: {
      type: Object,
      // 数组和对象要返回一个函数
      default () {
        return {}
      }
    }
  },
  components: {
    'app-star': Star
  },
  computed: {
    head_pic_url () {
      // 计算属性为了使background-size和background-position在css中起作用
      // eslint-disable-next-line
      return "background-image: url(" + this.poiInfoo.head_pic_url + ");"
    },
    head_bg () {
      // eslint-disable-next-line
      return "background-image: url(" + this.poiInfoo.pic_url + ");"
    },
    detail_bg () {
      // eslint-disable-next-line
      return "background-image: url(" + this.poiInfoo.poi_back_pic_url + ");"
    }
  },
  methods: {
    showBulletin () {
      this.isShow = true
    },
    closeBulletin () {
      this.isShow = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    height 130px
    padding-top 20px
    /*顶部通栏*/
    .top-wrapper
      position relative
      .back-wrapper
        width 50px
        height 31px
        position absolute
        left 0
        top 0
        text-align center
        line-height 31px
        .icon-arrow_lift
          display inline-block
          color white
      .serach-wrapper
        // float left
        width 100%
        height 31px
        // background pink
        padding 0 104px 0 50px
        /*设置盒子从边框开始计算*/
        box-sizing border-box
        -webkit-box-sizing border-box
        span
          width 10px
          height 10px
        .serach-icon
          // display inline-block
          padding 10px 10px 5px 10px
          margin-left 3px
          // font-size 12px
          width 10px
          height 10px
          // width 50%
          // height 100%
          background-size 3px 3px
          // background url(./img/search.png) no-repeat
          position absolute
        .serach-bar
          width 100%
          height 31px
          border 0
          /* 设置盒子从边框开始计算 */
          box-sizing border-box
          background #cdcdcc
          border-radius 25px
          padding-left 28px
          /* 去除选中时的蓝色边框 */
          outline none
      .more-wrapper
        width 65px
        height 24px
        /* background orange */
        position absolute
        right 0
        top 0
        padding 7px 15px 0 24px
        .spelling-bt
          float left
          width 30px
          height 17px
          color white
          line-height 17px
          border 1px solid white
          text-align center
          text-decoration none
          font-size 10px
        .more-bt
          float right
          width 20px
          height 24px
          margin-left 13px
          margin-top 6px
          .s-radius
            width 3px
            height 3px
            border-radius 50%
            border 1px solid white
            display block
            float  left
            margin-right 1px
      /* 主题内容 */
    .content-wrapper
      padding 17px 10px 11px
      height 50px
      .icon
        float left
        /* 设置这个框的宽高 */
        width 50px
        height 50px
        background-position center
        /* 设置背景图片宽和高*/
        background-size 135% 100%
        border-radius 5px
      .name
        float left
        padding 18px 0 0 12px
        h3
          font-size 16px
          font-weight bold
          color white
      .collect
        float right
        width 25px
        height 37px
        padding-top 6px
        text-align center
        img
          width 20px
          height 20px
        span
          margin-top 7px
          font-size 11px
          color white
          /* 公告内容 */
    .bulletion-wrapper
      padding 0 10px
      height 16px
      .icon
        float left
        width 16px
        height 16px
        margin-right 6px
      .text
        float left
        line-height 16px
        font-size 11px
        color white
      .detail
        float right
        line-height 16px
        font-size 11px
        color white
        span
          float right
          line-height 16px
          font-size 16px
        /* 背景图片 */
    .bg-wrapper
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      height 150px
      background-size 100% 135%/* 宽100% 高 135%*/
      background-position center -12px
      /* 公告详情 */
    .bulletion-detail
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background rgba(98, 98, 98, 0.8)
      z-index 999
      .detail-wrapper
        padding 43px 20px 125px
        width 100%
        height 100%
        box-sizing border-box
        .main-wrapper
          width 100%
          height 100%
          background-size 100% 100%
          border-radius 10px
          text-align center
          .icon
            display inline-block
            width 60px
            height 60px
            margin-top 40px
            border-radius 5px
            background-size 135% 135%
            background-position center
          .name
            margin-top 13px
            font-size 15px
            color white
          .score
            height 10px
            margin-top 6px
            text-align center
            font-size 0
            .star
              display inline-block
              margin-right 7px
            span
              display inline-block
              font-size 10px
              color white
          .tip
            margin-top 8px
            color #bababc
            font-size 11px
            i
              margin 0 7px
          .time
            margin-top 13px
            font-size 11px
            color #bababc
          .discounts
            margin-top 20px
            padding 0 20px
            p
              padding-top 20px
              border-top 1px solid #BABABC
              img
                vertical-align middle
                width 16px
                height 16px
              span
                line-height 16px
                font-size 11px
                color white
        .close-wrapper
          padding-top 20px
          height 40px
          text-align center
          span
            display inline-block
            width 40px
            height 40px
            line-height 40px
            border-radius 50%
            font-size 14px
            color white
            background rgba(118, 118, 118, 0.7)
            border 1px solid rgba(140, 140, 140, 0.9)
    /* 动画效果 */
      /* 进入的时候和离开的时候有这个过渡的动画2秒 */
    .bulletin-detail-enter-active, .bulletin-detail-leave-active
      transition 1.5s all
      /* 进入之前和完全离开的时候 */
    .bulletin-detail-enter, .bulletin-detail-leave-to
      opacity 0
      /* 完全进入之后和离开之前 */
    .bulletin-detail-enter-to, .bulletin-detail-leave
      opacity 1
</style>
