<template>
  <div class="header">
    <!-- 顶部通栏 开始 -->
    <!-- 顶部通栏 结束 -->
    <!-- 主题内容 开始 -->
    <!-- 主题内容 结束 -->
    <!-- 公告内容 开始 -->
    <!-- 公告内容 结束 -->
    <!-- 背景 开始 -->
    <!-- 背景 结束 -->
    <!-- 公告详情开始 -->
    <!-- 公告详情结束 -->
    {{poiInfoo.name}}
  </div>
</template>

<script>
export default {
  props: {
    // app.vue 组件传过来的值
    poiInfoo: {
      type: Object,
      // 数组和对象要返回一个函数
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
