<template>
  <div class="goods">
  <div class="menu-wrapper">
  </div>
  <div class="foods-wrapper">
  </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      console.log(response);
    });
  }
};
</script>

<style lang="stylus" scoped>
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
    .foods-wrapper
      flex: 1
      background: red
</style>
