<template>
  <div class="goods">
    <!-- 分类列表 -->
    <!-- ref单独拿到这个元素，在此即整个分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <!-- 列表形式，使用ul -->
      <ul>
        <!-- 专场 -->
        <!-- currentIndex === 0(因为专场就在最上面，下标是固定了的0) -->
        <li class="menu-item" :class="{'current' : currentIndex === 0}" @click='selectMenu(0)'>
          <p class="text">
            <!-- 有些有图标，有些没有，v-if判断是否显示 -->
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon" alt="专场图标">
            {{container.tag_name}}
          </p>
        </li>
        <!-- 热销之后 -->
        <!-- currentIndex === index + 1(专场是固定0没有进行遍历，这从1开始) -->
        <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current' : currentIndex === index + 1}" @click="selectMenu(index + 1)">
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon" alt="热销图标">
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <!-- ref单独拿到这个元素，在此即整个商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <!-- food-list-hook用来获取高度而定义的类名 -->
        <li class="container-list food-list-hook">
          <div v-for="(item, index) in container.operation_source_list" :key="index">
            <img class="img" :src="item.pic_url" alt="专场图片">
          </div>
        </li>
        <!-- 商品具体分类 -->
        <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
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
              <!-- 引入加减符号组件，与content同级别 -->
              <div class="cartcontrol-wrapper">
                <!-- food传递给子组件，让其加减操作 -->
                <CartControl :foodd="food"></CartControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <ShopCart :poiInfoo="poiInfo" :selectFoodss="selectFoods"></ShopCart>
  </div>
</template>

<script>
// 引入better-scroll外部组件
import BScroll from 'better-scroll'
// 引入底部购物车组件
import ShopCart from '../shopcart/ShopCart'
// 引入加减符号组件
import CartControl from '../cartcontrol/CartControl'
export default {
  data () {
    return {
      // 请求到的数据，重新取名
      container: {},
      goods: [],
      // 为了shopcart组件能拿到poi_info里的数据，父组件传值给子组件
      poiInfo: {},
      // 定义分类列表的高度
      listHeight: [],
      // 将滚动的实例化的对象保存下来，然后才可以使用该对象去添加滚动事件
      menuScroll: {},
      foodScroll: {},
      // 用来接收转化后的高度值，因为取到的高度值有小数，负值。
      scrollY: 0
    }
  },
  components: {
    ShopCart,
    CartControl
  },
  // 数据观测(data observer)，属性和方法的运算，
  // watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。dom没渲染
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
          // 为了shopcart组件能拿到poi_info里的数据，父组件传值给子组件
          this.poiInfo = response.data.poi_info
          // 与DOM相关操作写在该函数回调中，dom更新之后
          this.$nextTick(() => {
            // 执行滚动方法
            this.initScroll()
            // 计算分类高度
            this.calculateHeight()
          })
        }
        // console.log(this.goods)
        // console.log(this.container)
        // console.log(this.poiInfoo)
      })
  },
  // computed: {
  //   head_bg () {
  //     // eslint-disable-next-line
  //     return "background-image: url(" + this.goods.icon + ");"
  //   }
  // }
  methods: {
    selectMenu (index) {
      // 依然要获取元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      // 获取下标
      let element = foodlist[index]
      // 滚动到对应的右侧商品 使用better-scroll内置方法scrollToElement 作用是滚动到指定的目标元素
      this.foodScroll.scrollToElement(element, 250)
    },
    head_bg (img) {
      // eslint-disable-next-line
      return "background-image: url(" + img + ");"
    },
    // better-scroll 通过创建一个实例化方法来控制需要滚动的地方
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        // 注意，better-scroll会阻止点击事件，需设置click：true
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        // better-scroll属性，值为3的时候，在滚动的时候，实时派发scroll事件
        probeType: 3
      })
      // 第二步，监听滚动位置
      // foodScroll监听事件  on(添加事件的方法)，第一个参数是事件名
      // 该方法是better-scroll的内置方法 scroll
      this.foodScroll.on('scroll', (pos) => {
        // console.log(pos.y)
        // 对拿到的高度值进行取整，取正数
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.scrollY)
      })
    },
    // 第一步，计算分类的区间高度
    calculateHeight () {
      // 第一步，获取元素，计算分类区间高度
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      // console.log(foodlist)
      // 需要进行累加的高度，初始为0
      let height = 0
      // 把高度放入定义好的数组
      this.listHeight.push(height)
      // 循环整个foodlist列表的
      for (let i = 0; i < foodlist.length; i++) {
        // 拿到每个单独的列表
        let item = foodlist[i]
        // 累加高度   clientHeight(item的可视高度)
        height = height + item.clientHeight
        // 把每个高度放进listHeight数组
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    }
  },
  computed: {
    // 第三步，根据滚动位置确认下标，与左侧对应，计算属性返回下标
    // 通过高度区间listHeight，和高度值scrollY对比拿到下标
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        // 获取商品区间的范围
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 判断是否在上面的区间中 !height2(为了解决越界问题，就是最后一个区间问题)
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // console.log(i)
          return i
        }
      }
      return 0
    },
    // 该方法用来监听foods是否有变化，再通过绑定传递给子组件，
    selectFoods () {
      // 定义一个数组做购物车的容器
      let foods = []
      // forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数,该处把myfoods传递给回调函数
      this.goods.forEach((myfoods) => {
        // 再进行遍历，拿到myfoods（food_spu_tags）下面的spus
        myfoods.spus.forEach((food) => {
          if (food.count > 0) {
            foods.push(food)
          }
        })
      })
      // 返回这个数组，让它传给子组件
      return foods
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
        /* 商品选择时左侧菜单样式 */
      .current
        margin-top -1px
        font-weight bold
        background white
        &:first-child
          margin-top 1px
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
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 0
</style>
