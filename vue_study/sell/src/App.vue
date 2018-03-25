<template>
  <div id="app">
    <v-header :seller="seller">
    </v-header>
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
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header';
import {urlParse} from './common/js/util';
const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          // 通过一个方法拿到queryParm，
          let queryParm = urlParse();
          console.log(queryParm);
          return queryParm.id;
        })()
      }
    };
  },
  // 通过后端api的方式拿到seller
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.data;
      // console.log(response);
      // === 全等 和 = 和 == 的区别
      if (response.errno === ERR_OK) {
        // this.seller = response.data;
        // console.log(this.seller);
        // 给对象扩展属性的方法
        this.seller = Object.assign({}, this.seller, response.data);
        console.log(this.seller.id);
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus">
  @import './common/stylus/mixin.styl'
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          text-decoration: none
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240,20,20)
</style>
