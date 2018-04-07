import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

Vue.use(Router)

// 创建routes
export default new Router({
  // 去掉 #
  mode: 'history',
  // 设置router的默认class为 active
  linkActiveClass: 'active',
  routes: [
    {
      // 重定向
      path: '/', redirect: '/goods'
    },
    {
      path: '/goods', component: Goods
    },
    {
      path: '/ratings', component: Ratings
    },
    {
      path: '/seller', component: Seller
    }
  ]
})
