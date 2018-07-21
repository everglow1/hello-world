<template>
  <div id="app">
      <vheader :sellers="seller"></vheader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :sellers="seller"></router-view>
    </div>
  </div>
</template>

<script>
import vheader from '@/components/header/header'
const ERR_OK = 0
export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    'vheader': vheader
  },
  created () {
    this.getSeller()
  },
  methods: {
    getSeller () {
      this.$http.get('api/seller').then((res) => {
        if (res.data.errno === ERR_OK) {
          this.seller = res.data.data
          // console.log(this.seller)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/mixin.styl'
  #app
    .tab
      // flex布局标签栏
      display: flex
      // flex-direction: row  /* 默认从左到右排列 */
      width: 100%
      height: 40px
      line-height: 40px
      // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      // stylus可以写类似方法。
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          // 设为块状，使按键在范围扩大
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
