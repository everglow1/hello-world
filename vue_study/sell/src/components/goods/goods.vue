<template>
  <div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul class="menu">
      <li v-for="(item, index) in goods" :key="item.index" class="menu-item" @click="selectMenu(index, $event)" :class="{current: currentIndex == index}">
        <span class="text" border-1px>
          <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul class="food-left">
      <li v-for="item in goods" :key="item.index" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul class="food-left">
          <li v-for="food in item.foods" :key="food.index" class="food-item border-1px">
            <div class="icon">
              <img width="57" height="57" :src="food.icon">
            </div>
            <div class="content">
              <h4 class="name">{{food.name}}</h4>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';

const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0// 跟踪这个变量
    };
  },
  components: {
    shopcart
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((response) => {
      // console.log(response);
      response = response.data;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        // console.log(this.goods);
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.memuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        // 监听到位置
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      // 定义临时变量
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      // console.log(index);
      if (!event._constructed) {
        return 0;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl";

  .goods
    display: flex
    position: absolute
    top: 182px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu
        padding-left: 10px
        .menu-item
          display: table
          height: 54px
          width: 56px
          line-height: 14px
          padding: 0 6px
          &.current
            position: relative
            margin-top: 10
            z-index: 10
            background: #fff
            font-weight: 700
            .text
              border-none()
            .icon
              display: inline-block
              vertical-align: top
              width: 12px
              height: 12px
              margin-right: 2px
              background-size: 12px 12px
              background-repeat: no-repeat
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
          .text
            font-size: 12px
            display: table-cell
            vertical-align: middle
            width: 56px;
            border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .food-left
        padding: 0
        margin: 0
        .food-list
          list-style: none
        .title
          padding-left: 14px
          margin-top: 0
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .desc, .extra
              line-height: 10px
              margin-bottom: 8px
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
             margin-bottom: 8px
             line-height: 12px
            .extra
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .new
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-direction: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
</style>
