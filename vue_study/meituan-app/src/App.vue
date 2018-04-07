<template>
  <div id="app">
    <!-- 头部 -->
    <v-header :poiInfoo="poiInfo"></v-header>
    <!-- 导航 -->
    <v-nav></v-nav>
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
      poiInfo: {}
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
        console.log(this.poiInfo)
      })
  }
}
</script>

<style>

</style>
