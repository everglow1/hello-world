<template>
  <div class="seller" ref="sellerr">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports" :key="item.index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pic">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.id">
              <img :src="pic" alt="商家图片" height="90" width="120">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos" :key="info.id">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star';
import split from '../split/split';
import BScroll from 'better-scroll';
import {saveToLocal, loadFromLocal} from '../../common/js/store.js';

export default {
  data() {
    return {
      // favorite: false
      favorite: (() => {
        // 这个是存储了favorite。
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    // favoriteText文案 依据favorite变量的true or false来判断是收藏还是没有收藏
    // 返回到dom元素上去
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  components: {
    star,
    split
  },
  watch: {
    // 刚开始刷新页面的时候
    seller () {
      this._initScroll();
      this._initPicscroll();
    }
  },
  methods: {
    toggleFavorite(event) {
      // 因为在srcoll里面 所以执行这个逻辑
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    // 此方法也行
    // toggleFavorite() {
    //   if (this.favorite) {
    //     this.favorite = true;
    //   }
    //   this.favorite = !this.favorite;
    // },
    _initScroll() {
      if (!this.scroll) {
        this.$nextTick(() => {
          // BScroll 第一个参数是dom  在dom被渲染之后，内容被撑开之后，BScroll发挥作用
          this.scroll = new BScroll(this.$refs.sellerr, {
            click: true
          });
        });
      }
    },
    _initPicscroll() {
      this.$nextTick(() => {
        if (this.seller.pics) {
        // console.log(this.seller.pics.length);
        // 定义每个图片的宽度，外边距
        let picWidth = 120;
        let margin = 6;
        // 总的的宽度，等于图片的宽度加外边距 乘于图片的个数减去最后一个外边距
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        // 设置ul的宽度
        this.$refs.picList.style.width = width + 'px';
        // 运用better-scroll
        this.$nextTick(() => {
          if (!this.picScroll) {
             // 定义一个picScroll
            this.picScroll = new BScroll(this.$refs.picWrapper, {
            // 表示横向滚动
            scrollX: true,
            // 让它既可以竖直方向滚动，又可横向滚动， 横向滚动的时候忽略竖直方向的滚动
            eventPassthrough: 'vertical'
          });
          } else {
            this.picScroll.refresh();
          }
        });
      }
      });
    }
  },
  // ready被mounted替换了
  mounted() {
    // console.log(this.seller);
    // console.log(this.seller.pics.length);
    // this._initPics();
    // this.$nextTick(() => {
    // });
    this._initScroll();
    this._initPicscroll();
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      padding: 18px
      position: relative
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .desc
        padding-bottom: 18px
        font-size: 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          display: inline-block
          vertical-align: top
          margin-right: 12px
          line-height: 18px
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding: 18px 0 0 0
        list-style: none
        margin: 0
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(77, 85, 93)
          .stress
            font-size: 20px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 24px
      .favorite
        position: absolute
        right: 11px
        top: 18px
        width: 50px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
      .supports
        list-style: none
        padding: 0
        margin: 0
        .support-item
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          &:last-child
            border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
    .pic
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .info
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        line-height: 14px
        font-size: 14px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        // border-1px(rgba(7, 17, 27, 0.1))
      ul
        padding: 0
        margin: 0
        list-style: none
        .info-item
          padding: 16px 12px
          line-height: 16px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          &:last-child
            border-none()
</style>
