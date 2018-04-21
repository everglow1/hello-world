<template>
  <div class="ratings" ref="rating">
    <div class="rating-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家评分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <!-- star组件需要绑定Score分数，根据分数显示星星个数, star组件的props为scoree -->
              <Star :scoree="ratings.quality_score" class="star"></Star>
              <span class="score"></span>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <Star :scoree="ratings.pack_score" class="star"></Star>
              <span class="score"></span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      <!-- 横杠组件 -->
      <Split></Split>
      <div class="content">
        <!-- 有图无图评价选择 -->
        <!-- v-if="ratings.tab" 确定有没有值 -->
        <div class="rating-select" v-if="ratings.tab">
          <!-- ratings.tab[0].comment_score_title tab为数组 @click="selectTypeFn()"方法-->
          <!-- :class="{'active': selectType==2}" 动态样式，为了点击显示样式，当selectTYpe为2的时候，样式显示点击事件传入2 -->
          <!-- 全部 -->
          <span class="item" :class="{'active': selectType==2}" @click="selectTypeFn(2)">{{ratings.tab[0].comment_score_title}}</span>
          <!-- 有图 'active': selectType==1 时，显示 -->
          <span class="item" :class="{'active': selectType==1}" @click="selectTypeFn(1)">{{ratings.tab[1].comment_score_title}}</span>
          <!-- 点评 -->
          <span class="item" :class="{'active': selectType==0}" @click="selectTypeFn(0)">
            <!-- v-show="selectType == 0" 两个都写，防止另一个占文档流位置 -->
            <img v-show="selectType != 0" src="./img/icon_sub_tab_dp_normal@2x.png"/>
            <img v-show="selectType == 0" src="./img/icon_sub_tab_dp_highlighted@2x.png"/>
            {{ratings.tab[2].comment_score_title}}
          </span>
        </div>
        <div class="labels-view">
          <!-- :class="{'heightLight': item.label_star > 0}"显示 -->
          <span class="item" v-for="(item, index) in ratings.labels" :key="index" :class="{'heightLight': item.label_star > 0}">{{item.content}}{{item.label_count}}</span>
        </div>
        <!-- 评价列表 -->
        <ul>
          <!-- 遍历selectComments(计算属性)，拿到不同的评价内容 -->
          <li class="comment-item" v-for="(comment, index) in selectComments" :key="index">
            <div class="comment-header">
              <img class="img" :src="comment.user_pic_url" v-if="comment.user_pic_url" alt="用户图标"/>
              <!-- 替代的图标 -->
              <img class="img" src="./img/anonymity.png" v-if="!comment.user_pic_url" alt="用户没有图标时的替代图标"/>
            </div>
            <!-- 评价内容 -->
            <div class="comment-main">
              <div class="user">{{comment.user_name}}</div>
              <div class="time">{{formatDate(comment.comment_time)}}</div>
              <div class="star-wrapper">
                <div class="text">评分</div>
                <!-- 星星评分组件 -->
                <Star :scoree="comment.order_comment_score" class="star"></Star>
              </div>
              <div class="content">{{comment.comment}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入滚动组件,需进行实例化
import BScroll from 'better-scroll'
// 引入横杠组件
import Split from '../split/Split'
// 引入星星组件
import Star from '../star/Star'
// 为了显示所有，有图，点评而定义常量，因为有3种情况，全部，有图，点评
// 所有评价
const ALL = 2
// 有图评价
const PICTURE = 1
// 点评
// eslint-disable-next-line
const COMMENT = 0
export default {
  data () {
    return {
      ratings: {},
      // 默认显示所有评价
      selectType: ALL
    }
  },
  components: {
    Split,
    Star
  },
  created () {
    // 请求ratings接口，拿到ratings数据
    fetch('/api/ratings').then(res => {
      return res.json()
    })
      .then(response => {
        // console.log(response)
        if (response.code === 0) {
          this.ratings = response.data
          // 初始化时，就触发滚动事件
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.rating, {
                click: true,
                probeType: 3
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        // console.log(this.ratings)
      })
  },
  methods: {
    // 选择样式传入值，传数值几，0,1,2.就显示那个样式
    selectTypeFn (type) {
      this.selectType = type
    },
    // 转化时间错，主要使用正则
    formatDate (time) {
      // 得到时间
      let date = new Date(time * 1000)
      // 时间的格式，xxxx-mm-dd，比如：2018-04-20
      let fmt = 'yyyy.MM.dd'
      if (/(y+)/.test(fmt)) {
        // 年
        let year = date.getFullYear().toString()
        fmt = fmt.replace(RegExp.$1, year)
      }
      if (/(M+)/.test(fmt)) {
        // 月
        let mouth = date.getMonth() + 1
        if (mouth < 10) {
          mouth = '0' + mouth
        }
        fmt = fmt.replace(RegExp.$1, mouth)
      }
      if (/(d+)/.test(fmt)) {
        // 日
        let mydate = date.getDate()
        if (mydate < 10) {
          mydate = '0' + mydate
        }
        fmt = fmt.replace(RegExp.$1, mydate)
      }
      return fmt
    }
  },
  computed: {
    // 点击不同内容显示不同的评价，li遍历一个计算属性
    selectComments () {
      // 返回全部的评价
      if (this.selectType === ALL) {
        return this.ratings.comments
      } else if (this.selectType === PICTURE) {
        // 有图的请求需要遍历comments(整个评论数组)，返回到有图的评价
        let arr = []
        this.ratings.comments.forEach(comment => {
          // comment_pics为数组，如果这个数组的长度不等于0 就放入arr数组，返回去
          if (comment.comment_pics.length) {
            arr.push(comment)
          }
        })
        return arr
      } else {
        // 返回点评的评价
        return this.ratings.comments_dp.comments
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ratings
    position absolute
    // 设置该属性，当滚动的时候，就不会滚动全图。就只在固定页面滚动
    overflow hidden
    left 0
    top 191px
    bottom 0
    width 100%
    .overview
      display flex
      padding 20px 0 18px 0
      .overview-left
        flex 1
        padding-left 26px
        .comment-score
          float left
          width 48px
          text-align center
          margin-right 26px
          .score
            margin-bottom 9px
            font-weight 800
            font-size 23px
            color #ffb000
          .text
            font-size 11px
            color #666666
        .other-score
          float left
          margin-top 3px
          .quality-score
            margin-bottom 14px
          .item
            height 11px
            .text
              float left
              font-size 11px
              margin-right 11px
              color #666666
            .star
              float left
              margin-left 11px
            .score
              float left
              font-size 11px
              color #ffb000
      .overview-right
        flex 0 0 100px
        text-align center
        border-left 1px solid #9d9d9d
        .score
          margin-top 3px
          margin-bottom 10px
          font-size 19px
          font-weight 500
          color #999999
        .text
          font-size 11px
          color #999999
    .content
      padding 16px
      .rating-select
        width 100%
        margin-bottom 11px
        box-sizing border-box
        border 1px solid #ffb000
        border-right 0
        border-radius 3px
        font-size 0
        .item
          display inline-block
          width 33.3%
          height 33px
          line-height 33px
          text-align center
          border-right 1px solid #ffb000
          box-sizing border-box
          font-size 14px
          color #ffb000
          &:last-child img
            height 14px
            vertical-align middle
          &.active
            background #ffb000
            color black
      .labels-view
        .item
          display inline-block
          height 27px
          padding 0 10px
          margin-right 6px
          margin-bottom 6px
          line-height 27px
          font-size 12px
          border-radius 3px
          color #999999
          background #f4f4f4
          &.heightLight
            color #656565
      // ul与rating-title平级，但是无class，所以li的calss与rating-title平级
      .comment-item
        display  flex
        width 100%
        padding 16px 16px 16px 0
        box-sizing border-box
        border-bottom 1px solid #f4f4f4
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
          .star-wrapper
            float left
            width 100%
            margin-top 12px
            margin-bottom 15px
            .text
              float left
              font-size 11px
              color #999999
            .star
              float left
              margin-left 7px
          .content
            margin-top 17px
            font-size 13px
            line-height 19px
</style>
