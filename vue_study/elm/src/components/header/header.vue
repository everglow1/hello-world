<template>
  <div class="header">
    <!-- 内容 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="sellers.avatar" alt="#" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellers.name}}</span>
        </div>
        <div class="description">
          {{sellers.description}}/{{sellers.deliveryTime}}分钟到来
        </div>
        <!-- v-if="sellers.supports"  这是因为请求数据是一个异步过程，传递过来的是一个空的sellers，所以判断有才显示 -->
        <div class="supports" v-if="sellers.supports">
          <span class="icon" :class="classMap[sellers.supports[0].type]"></span>
          <div class="text">{{sellers.supports[0].description}}</div>
        </div>
      </div>
      <div class="support-count" v-if="sellers.supports" @click="showDetail">
        <span class="count">{{sellers.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 底部公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{sellers.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <!-- 头部背景 -->
    <div class="background">
      <img :src="sellers.avatar" alt="#" width="100%" height="100%">
    </div>
    <!-- 弹窗浮层详情 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <!-- css stickey布局，内容区域，可随机长度，底部footer始终在底部-->
        <div class="detail-wrapper clearfix">
          <!-- 内容区 -->
          <div class="detail-main">
            <h1 class="name">{{sellers.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="sellers.score"></star>
            </div>
            <!-- flex布局小标题 -->
            <div class="title">
              <!-- 使用span在某些手机上会有兼容性问题 -->
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="sellers.supports">
              <li class="support-item" v-for="(item, index) in sellers.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <!-- 使用span在某些手机上会有兼容性问题 -->
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{sellers.bulletin}}</p>
            </div>
          </div>
        </div>
        <!-- 关闭 -->
        <div class="detail-close" @click="closeShow">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from 'components/star/star'

export default {
  props: {
    sellers: {}
  },
  data () {
    return {
      // 弹窗控制
      detailShow: false
    }
  },
  components: {
    star
  },
  methods: {
    // 显示弹窗
    showDetail () {
      this.detailShow = true
    },
    // 关闭弹窗
    closeShow () {
      this.detailShow = false
    }
  },
  created () {
    // 为了让type 的 0,1,2 对应到 class
    // 让数组的下标对应到折扣，减，什么的, 通过下标访问到
    this.classMap = ['decrease', 'discount', 'guarantee', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  .header
    // 为了让background以header进行定位
    position: relative
    color: #fff
    // 半透明，独步图片可透过来
    background: rgba(7, 17, 27, 0.5)
    overflow: hidden
    // 设置backgroud后，会盖住 z-index
    // background: #999
    .content-wrapper
      // 要设置他与外部“块”间的距离用margin，要设置他与内部内容间的距离用padding
      padding: 24px 12px 18px 24px
      font-size: 0
      position: relative
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        // vertical-align: top
        display: inline-block
        font-size: 14px
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            // vertical-align: top
            width: 30px
            height: 18px
            // 函数写法
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
          // 哪个元素写vertical-align: top 哪个元素变动
            vertical-align: top
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          font-size: 12px
          line-height: 12px
          color: rgb(255, 255, 255)
        .supports
          .icon
            display: inline-block
            // vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            // 真实线上的动态的变化
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
          padding-left: 6px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      background-color: rgba(7, 17, 27, 0.2)
      // 这会导致省略号消失
      // font-size: 0
      // 不折行
      white-space: nowrap
      overflow: hidden
      // 当发生文本溢出的时候，以省略号来代表被修剪的文本
      text-overflow: ellipsis
      .bulletin-title
        vertical-align: middle
        display: inline-block
        width: 22px
        height: 12px
        // 引入函数式写法，在不同设备像素比显示不同的图片大小
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        // vertical-align: top
        margin: 0 4px 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      // 以header进行定位
      position absolute
      top: 0
      left: 0
      // 撑满header，这样就全部覆盖作为背景
      width: 100%
      height: 100%
      z-index: -1
      // 滤镜模糊的效果
      filter: blur(10px)
    .fade-transition
      opacity 1
      background: rgba(7, 17, 27, 0.8)
    .fade-enter, .fade-leave
      opacity 0
      background: rgba(7, 17, 27, 0)
    .detail
      // fixed布局，相对于浏览器窗口
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width 100%
      height 100%
      overflow: auto
      backdorp-filter blur(10px)
      transition all 0.5s
      background: rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 64px
          // 给按钮留位置,让按钮不会覆盖内容
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px auto
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding 0 12px
              font-weight 700
              font-size 14px
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                // vertical-align middle
                margin-right 6px
                width 16px
                height 16px
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height 16px
                font-size 12px
                font-weight 200
                color rgb(255, 255, 255)
                vertical-align top
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              font-size 12px
              font-weight 200
              color rgb(255, 255, 255)
              line-height 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
