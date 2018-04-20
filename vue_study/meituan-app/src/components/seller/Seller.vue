<template>
  <div class="seller">
    <div class="sell-wrapper">
      <Split></Split>
      <!-- 第一部分 -->
      <div class="seller-view">
        <div class="address-wrapper">
          <div class="adderss-left">{{seller.address}}</div>
          <div class="address-right">
            <div class="content"></div>
          </div>
        </div>
        <!-- 图片 -->
        <div class="pics-wrapper" v-if="seller.poi_env">
          <ul class="pics-list">
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
      <div class="tip-wrapper"></div>
      <Split></Split>
      <!-- 第三部分 -->
      <div class="other-wrapper"></div>
    </div>
  </div>
</template>

<script>
// 引入横杠组件
import Split from '../split/Split'
// 引入BScroll组件
// import BScroll from 'better-scroll'
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
          // this.$nextTick(() => {
          //   if (!this.scroll) {
          //     this.scroll = new BScroll(this.$refs.rating, {
          //       click: true,
          //       probeType: 3
          //     })
          //   } else {
          //     this.scroll.refresh()
          //   }
          // })
        }
        console.log(this.seller)
      })
  }
}
</script>

<style scoped>

</style>
