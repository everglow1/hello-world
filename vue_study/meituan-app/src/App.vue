<template>
  <div id="app">
    <!-- 头部 -->
    <v-header :poiInfoo="poiInfo"></v-header>
    <!-- 导航 -->
    <!-- nav组件获得vue组件的commentNum值 -->
    <v-nav :commentNumm="commentNum"></v-nav>
    <!-- 内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/Header'
import nav from './components/nav/Nav'
export default {
  name: 'App',
  data () {
    return {
      // 自定义一个poiInfo,请求到数据之后，把poi_info赋给poiInfo
      poiInfo: {},
      // 自定义一个commentNum,请求ratings数据，把comment_num赋给commentNum
      commentNum: 0
    }
  },
  components: {
    'v-header': header,
    'v-nav': nav
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
          this.poiInfo = response.data.poi_info
        }
        // console.log(this.poiInfo)
      })
    // 请求ratings接口，拿到ratings数据
    fetch('/api/ratings').then(res => {
      return res.json()
    })
      .then(response => {
        // console.log(response)
        if (response.code === 0) {
          this.commentNum = response.data.comment_num
        }
        // console.log(this.poiInfo)
      })
  }
}
</script>

<style>

</style>
