<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper">
      <!-- 列表形式，使用ul -->
      <ul>
        <!-- 专场 -->
        <li class="menu-item">
          <p class="text">
            <!-- 有些有图标，有些没有，v-if判断是否显示 -->
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon" alt="专场图标">
            {{container.tag_name}}
          </p>
        </li>
        <!-- 热销 -->
        <li class="menu-item" v-for="(item, index) in goods" :key="index">
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon" alt="热销图标">
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper">
      <ul>
        <!-- 专场 -->
        <li class="container-list">
          <div v-for="(item, index) in container.operation_source_list" :key="index">
            <img class="img" :src="item.pic_url" alt="专场图片">
          </div>
        </li>
        <!-- 商品具体分类 -->
        <li class="food-list" v-for="(item,index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>
          <!-- 具体商品列表 -->
          <ul>
            <li class="food-item" v-for="(food, index) in item.spus" :key="index">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <!-- 这种用法 -->
              <!-- <div class="icon"> -->
                <!-- 设置图片宽高，把专场图片挤到上面 -->
                <!-- <img :src="food.picture" width="57" height="57">
              </div> -->
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img :src="food.product_label_picture" class="product">
                <p class="price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求到的数据，重新取名
      container: {},
      goods: []
    }
  },
  created () {
    // axios 请求数据

    // fetch 请求数据，es6自带的方法
    fetch('/api/goods').then(res => {
      return res.json()
    })
      .then(response => {
        // console.log(response)
        if (response.code === 0) {
          this.container = response.data.container_operation_source
          this.goods = response.data.food_spu_tags
        }
        // console.log(this.goods)
        // console.log(this.container)
      })
  },
  // computed: {
  //   head_bg () {
  //     // eslint-disable-next-line
  //     return "background-image: url(" + this.goods.icon + ");"
  //   }
  // }
  methods: {
    head_bg (img) {
      // eslint-disable-next-line
      return "background-image: url(" + img + ");"
    }
  }
}
</script>

<style lang="stylus" scoped>
/* 整体布局，去掉上面头部和底部购物车*/
  .goods
    display flex
    position absolute
    /* 使用绝对定位，top（离顶部的距离）bottom（离底部的距离）*/
    top 190px
    bottom 51px
    overflow hidden
    width 100%
    .menu-wrapper
      flex 0 0 85px
      background #f4f4f4
      .menu-item
        padding 16px 23px 15px 10px
        border-bottom 1px solid #E4E4E4
        .text
          display -webkit-box
          vertical-align middle
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          line-height 17px
          font-size 13px
          color #333333
          overflow hidden
          .icon
            width 15px
            height 15px
            vertical-align middle
    .foods-wrapper
      flex 1
      /* 专场样式 */
      .container-list
        padding 11px 11px 0 11px
        border-bottom 1px solid #E4E4E4
        .img
          width 100%
          margin-bottom 11px
          border-radius 5px
          /* 具体分类总商品 */
      .food-list
        padding 11px
        .title
          padding-left 7px
          margin-bottom 12px
          height 13px
          background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center
          background-size 2px 10px
        .food-item
          display flex
          position  relative
          margin-bottom 25px
          .icon
            flex 0 0 63px
            height 75px
            margin-right 11px
            background-position center
            background-size 120% 100%
            background-repeat no-repeat
          /* 单个商品内容 */
          .content
            flex 1
            .name
              padding-right 27px
              margin-bottom 10px
              line-height 21px
              font-size 16px
              color #333333
            .desc
              margin-bottom 8px
              line-height 19px
              font-size 10px
              color #bfbfbf
              /* 超出部分显示省略号 */
              -webkit-line-clamp 1
              display -webkit-box
              -webkit-box-orient vertical
              overflow hidden
            .extra
              margin-bottom 7px
              font-size 10px
              color #bfbfbf
              .saled
                margin-right 14px
            .product
              height 15px
              margin-bottom 6px
            .price
              /* 防止间隙 */
              font-size 0
              .text
                font-size 14px
                color #fb4e44
              .unit
                font-size 12px
                color #bfbfbf
</style>
