<template>
  <div class="header">
    <router-link to="/">
      <img src="../assets/images/cnodejs.png" title="node.svg" class="img">
    </router-link>
    <!-- 点击打开dialog element-ui组件 -->
    <el-button class="btn" type="text" @click="dialogVisible = true">关于</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div class="dialog">
        <span>
          <strong>作者：Everglow</strong>
        </span>
        <br>
        <a href="https://github.com/Everglow1/hello-world/tree/master/vue_study/nodejs" target="_blank" style="text-decoration: none">Github</a>
        <br>
        <span>
          <strong>技术栈：</strong>
        </span>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li>Vue</li>
          <li>Vuex</li>
          <li>Vue-router</li>
          <li>Element-ui</li>
          <li>nodejs api</li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    background #324057
    height 3.6rem
    width 100%
    position absolute
    top 0
    left 0
    .img
      // display inline-block
      position relative
      float left
      width 10rem
      margin-left 10rem
      padding-top 0.6rem
    .btn
      display inline-block
      float right
      line-height 3.6rem
      margin-right 10rem
      font-weight bold
      font-size 20px
      color white
      letter-spacing 2px
      padding-top 0.2rem
      .dialog
        font-size 17px
</style>
