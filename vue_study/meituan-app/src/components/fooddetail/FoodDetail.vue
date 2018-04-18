<template>
  <transition name="food-detail">
    <!-- 图片部分 -->
    <!-- v-show="showFlag" （为了不直接展示这个页面） -->
    <div class="fooddetail" v-show="showFlag" ref="foodView">
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
        <!-- 横杠组件 -->
        <Split></Split>
        <!-- 外卖评价 -->
        <div class="rating-wrapper">
          <!-- 评价头部 -->
          <div class="rating-title">
            <!-- 评价头部左侧 -->
            <!-- 访问超过2级，没有数据会报错，需判断是否有该数据，才能访问下一层数据 -->
            <div class="like-ratio" v-if="selectFoods.rating">
              <span class="title">{{selectFoods.rating.title}}</span>
              <span class="retio">
                ({{selectFoods.rating.like_ratio_desc}}
                <i>{{selectFoods.rating.like_ratio}}</i>)
              </span>
            </div>
            <!-- 评价头部右侧 -->
            <div class="snd-title" v-if="selectFoods.rating">
              <span class="text">{{selectFoods.rating.snd_title}}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <!-- 评价内容 -->
          <ul v-if="selectFoods.rating">
            <!-- 遍历selectFoods.rating.comment_list，拿到评价内容 -->
            <li class="comment-item" v-for="(comment, index) in selectFoods.rating.comment_list" :key="index">
              <div class="comment-header">
                <img class="img" :src="comment.user_icon" v-if="comment.user_icon" alt="用户图标"/>
                <!-- 替代的图标 -->
                <img class="img" src="./img/anonymity.png" v-if="!comment.user_icon" alt="用户没有图标时的替代图标"/>
              </div>
              <!-- 评价内容 -->
              <div class="comment-main">
                <div class="user">{{comment.user_name}}</div>
                <div class="time">{{comment.comment_time}}</div>
                <div class="content">{{comment.comment_content}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 引入横杠组件
import Split from '../split/Split'
// 为了评价能滚动，引入better-scroll组件,需初始化，在showView里面初始化，为了一进入该详情页就可以滚动评价
import BScroll from 'better-scroll'
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
    CartControl,
    Split
  },
  methods: {
    showView () {
      // 通过Goods组件点击，更改此状态，即父组件调用子组件的方法
      this.showFlag = true
      // 滚动评价，放在哪个地方，就是超过这个地方就滚动
      this.$nextTick(() => {
        if (!this.scroll) {
          // eslint-disable-next-line
          this.scroll = new BScroll(this.$refs.foodView, {
            click: true,
            probeType: 3
          })
        } else {
          // 保存缓存的内容，刷新页面。
          this.scroll.refresh()
        }
      })
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
  .fooddetail .rating-wrapper
    padding-left 16px
    .rating-title
      padding 16px 16px 16px 0
      .like-ratio
        float left
        font-size 0
        .title
          font-size 13px
        .ratio
          font-size 11px
          i
            font-size 11px
            color #fb4e44
      .snd-title
        float right
        font-size 0
        .text, .icon
          display inline-block
          font-size 13px
          color #9d9d9d
        .icon
          margin-left 12px
    // ul与rating-title平级，但是无class，所以li的calss与rating-title平级
    .comment-item
      display flex
      padding 15px 14px 17px 0
      width 100%
      border-bottom 1px solid #f4f4f4
      // 盒子content加上了padding和border
      box-sizing border-box
      .comment-header
        flex 0 0 41px
        margin-left 10px
        .img
          // display inline-block
          width 41px
          height 41px
          border-radius 50%
      .comment-main
        flex 1
        margin-top 6px
        .user
          float left
          width 50%
          font-size 12px
          color #333333
        .time
          float right
          width 50%
          font-size 10px
          text-align right
          color #666666
        .content
          margin-top 17px
          font-size 13px
          line-height 19px
</style>
