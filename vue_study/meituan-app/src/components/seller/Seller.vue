<template>
  <div class="seller"  ref="sellerr">
    <div class="seller-wrapper">
      <Split></Split>
      <!-- 第一部分 -->
      <div class="seller-view">
        <div class="address-wrapper">
          <img class="img" src="./img/address.png" alt="地址"/>
          <div class="address-left">{{seller.address}}</div>
          <div class="address-right">
            <div class="content"></div>
          </div>
        </div>
        <!-- 图片 -->
        <!-- v-if="seller.poi_env" 直接遍历两层，需要判断是否有，不然会报错 -->
        <div class="pics-wrapper" v-if="seller.poi_env">
          <ul>
            <li class="pics-item" v-for="(imgurl, index) in seller.poi_env.thumbnails_url_list" :key="index">
              <img :src="imgurl"/>
            </li>
          </ul>
        </div>
        <div class="safety-wrapper">
          查看食品安全档案
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <Split></Split>
      <!-- 第二部分 -->
      <div class="tip-wrapper">
        <div class="delivery-wrapper">
          配送服务：{{seller.app_delivery_tip}}
        </div>
        <div class="shipping-time">
           配送时间：{{seller.shipping_time}}
        </div>
      </div>
      <Split></Split>
      <!-- 第三部分 -->
      <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <!-- poi_service数组需要遍历，虽然它只有一个内容 -->
          <div class="poi-server" v-for="(item,index) in seller.poi_service" :key="index">
            <img :src="item.icon"/>
            {{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discounts-item" v-for="(item, index) in seller.discounts2" :key="index">
            <div class="icon">
              <img :src="item.icon_url"/>
            </div>
            <div class="text">{{item.info}}</div>
          </div>
        </div>
      </div>
      <!-- test -->
      <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <!-- poi_service数组需要遍历，虽然它只有一个内容 -->
          <div class="poi-server" v-for="(item,index) in seller.poi_service" :key="index">
            <img :src="item.icon"/>
            {{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discounts-item" v-for="(item, index) in seller.discounts2" :key="index">
            <div class="icon">
              <img :src="item.icon_url"/>
            </div>
            <div class="text">{{item.info}}</div>
          </div>
        </div>
      </div>
      <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <!-- poi_service数组需要遍历，虽然它只有一个内容 -->
          <div class="poi-server" v-for="(item,index) in seller.poi_service" :key="index">
            <img :src="item.icon"/>
            {{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discounts-item" v-for="(item, index) in seller.discounts2" :key="index">
            <div class="icon">
              <img :src="item.icon_url"/>
            </div>
            <div class="text">{{item.info}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入横杠组件
import Split from '../split/Split'
// 引入滚动组件,需进行实例化
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      // 请求seller.json数据，赋值给seller
      seller: []
    }
  },
  components: {
    Split
  },
  created () {
    // 请求seller接口，拿到seller数据
    fetch('/api/seller').then(res => {
      return res.json()
    })
      .then(response => {
        // console.log(response)
        if (response.code === 0) {
          this.seller = response.data
          // 初始化时，就触发滚动事件
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.sellerr, {
                click: true,
                probeType: 3
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      })
  }
}
</script>

<style lang="stylus" scoped>
  .seller
    position absolute
    overflow hidden
    left 0
    top 191px
    bottom 0
    width 100%
    background #f4f4f4
    .seller-wrapper
      background white
      .seller-view
        padding-left 15px
        .address-wrapper
          display flex
          padding 16px 0
          border-bottom 1px solid #f4f4f4
          .img
            width 14px
            height 16px
            margin-top 12px
          .address-left
            flex 1
            padding-left 26px
            padding-right 31px
            line-height 19px
            font-size 14px
            // 不知为啥，有的background-size不能定义图片大小
            // background-size 0px 0px
            // background url(./img/address.png) no-repeat left center
          .address-right
            flex 0 0 60px
            background url(./img/line.png) no-repeat left center
            background-size 1px 15px
            .content
              width 100%
              height 100%
              background url(./img/phone.png) no-repeat center
              background-size 18px 18px
        .pics-wrapper
          overflow hidden
          padding 10px 0
          border-bottom 1p solid #f4f4f4
          white-space nowrap
          .pics-item
            display inline-block
            margin-right 11px
            width 93px
            height 75px
            img
              width 100%
              height 100%
        .safety-wrapper
          padding 15px 14px 15px 25px
          font-size 14px
          background url(./img/safety.png) no-repeat left center
          background-size 14px 16px
          span
            float right
            font-size 14px
      .tip-wrapper
        padding-left 15px
        .delivery-wrapper
          padding 15px 0 15px 25px
          font-size 14px
          border-bottom 1px solid #f4f4f4
          background url(./img/delivery.png) no-repeat left center
          background-size 14px 16px
        .shipping-time
          padding 15px 17px 15px 25px
          font-size 14px
          line-height 18px
          background url(./img/time.png) no-repeat left center
          background-size 15px 15px
      .other-wrapper
        padding-left 15px
        .server-wrapper
          padding 15px 0 17px 25px
          font-size 14px
          border-bottom 1px solid #f4f4f4
          background url(./img/server.png) no-repeat left center
          background-size 15px 15px
          .poi-server
            display inline-block
            margin-left 17px
            img
              width 15px
              height 15px
              margin-right 6px
              vertical-align middle
        .discounts-wrapper
          padding 17px 24px 19px 0
          .discounts-item
            display flex
            .icon
              flex 0 0 25px
              img
                width 15px
                height 15px
            .text
              flex 1
              font-size 14px
</style>
