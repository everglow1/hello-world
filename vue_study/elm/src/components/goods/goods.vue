<template>
  <div class="goods">
    <!-- left-wrapper -->
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <!-- index为遍历item的index -->
        <li @click="selctMenu(index, $event)" class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current': currentIndex === index}">
          <span class="text border-1px">
            <span v-show="item.type > -1" :class="classMap[item.type]" class="icon"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- right-foods -->
    <div class="foods-wrapper" ref="foodswrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="(food, index) in item.foods" :key="index">
              <div class="icon">
                <img width="57px" height="57px" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="dec">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-wrapper">
                  <!-- @cartAdd 子组件传来的事件 on接受 -->
                  <cartcontrol :food="food" @cartAdd="_drop"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="sellers.deliveryPrice" :minPrice="sellers.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
const ERR_OK = 0
export default {
  props: {
    sellers: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      // 列表高度存放
      listHeight: [],
      // 跟踪y轴值的变化
      scrollY: 0
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  created () {
    this.getGoods()
    this.classMap = ['decrease', 'discount', 'guarantee', 'special', 'invoice', 'guarantee']
  },
  computed: {
    // 左侧索引,匹配左侧菜单
    currentIndex () {
      // 遍历总的列表高度
      for (let i = 0; i < this.listHeight.length; i++) {
        // 拿到列表的上下高度，就有一个范围
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 判断所在区间的范围
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // 返回该索引
          return i
        }
      }
      return 0
    },
    // selectFoods数据，传给shopcart子组件
    selectFoods () {
      // 定义一个数组，用来接收所有food
      let foods = []
      // 第一次循环，拿到外部一层热销榜那层
      this.goods.forEach((good) => {
        // 二次循环。拿到所有单个food
        good.foods.forEach((food) => {
          // 根据数量有无，判断该商品是否被选中
          if (food.count) {
            foods.push(food)
          }
        })
      })
      // 再将foods返回， 传给shopcart
      return foods
    }
  },
  methods: {
    // 获取数据
    getGoods () {
      this.$http.get('api/goods').then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data
          /*
          * 巨坑， 要在请求到数据里面写这计算高度和better-scroll函数
          * 不然， for循环高度时，不会执行
          * nextTick，在操dom相关。 dom真正发生变化，是在nextTick回调函数之后
          */
          this.$nextTick(() => {
            this._initScroll()
            // 拿到高度
            this._calculateHeight()
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 使用better-scroll
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuwrapper, {
        /*
        * 手机端会阻止click点击，click：true（派发点击事件）
        * pc端不阻止点击事件，click：true（派发一次点击事件，自身默认一次点击事件，2次点击事件）
        */
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
        // 实时知道滚动的位置
        probeType: 3,
        click: true
      })
      // 利用better-scroll拿到y，赋值给scrollY，就可以跟左侧对比
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算总的列表高度
    _calculateHeight () {
      // 拿到父元素的子元素(所有的li列表)
      let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
      // 定义高度初始为0
      let height = 0
      // 先把第一个高度放进去
      this.listHeight.push(height)
      // 遍历所有li列表
      for (let i = 0; i < foodList.length; i++) {
        // 获得单个每个的list
        let item = foodList[i]
        // 累加高度（单个视口高度）
        height += item.clientHeight
        // 把每个li高度 放进listHeight数组
        this.listHeight.push(height)
      }
    },
    // 点击左侧菜单，滚动到右侧食品
    selctMenu (index, event) {
      // 关闭pc端的点击2次问题
      if (!event._constructed) {
        return
      }
      // 通过左侧的index，去判断滚动到哪个值,利用better-scroll的接口
      let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      // scrollToElement接口（better-scroll接口）
      this.foodsScroll.scrollToElement(el, 300)
    },
    _drop (target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
    // shopcart传递过来的事件
    // cartAdd (target) {
    //   console.log(' 2', target)
    //   // this._drop(target)
    // }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    width 100%
    top 174px
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      // 兼容性
      width 80px
      background #f3f5f7
      .menu-item
        // 垂直居中 display: table, very good
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10px
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .text
          display table-cell
          font-size 12px
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: middle
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            // 真实线上的动态的变化
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        font-size 12px
        color rgb(147, 153, 159)
        line-height 26px
        background #f3f5f7
        border-left 2px solid #d9dde1
        margin-bottom 18px
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            font-size 14px
            line-height 14px
            color rgb(7, 17, 27)
          .dec, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .dec
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            font-size 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cart-wrapper
            position absolute
            right 0
            bottom 12px
</style>
