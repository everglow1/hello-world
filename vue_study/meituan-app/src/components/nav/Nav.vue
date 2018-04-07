<template>
  <div class="nav">
     <router-link calss="nav-item" to="/goods">
      点菜
      <i class="line"></i>
     </router-link>
     <router-link calss="nav-item" to="/ratings">
      评价
      <i class="line"></i>
     </router-link>
     <router-link calss="nav-item" to="/seller">
      商家
      <i class="line"></i>
     </router-link>
     <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .nav
    display flex
    width 100%
    height 40%
    line-height 40px
    /* 下划线 */
    border-bottom 1px solid #e4e4e4
    // router-link 会被渲染为a标签，添加class无作用
    & > a
      flex 1
      position relative
      text-align center
      font-size 13px
      text-decoration none
      color #666666
      /* 选中的样式*/
      &.active
        color #ffbb22
        /* 选中下面的下划线*/
      &.active i.line
        position absolute
        left 50%
        bottom 0
        margin-left -10px
        width 20px
        height 2px
        display inline-block
        background #ffbb22
</style>
