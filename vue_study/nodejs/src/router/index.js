import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import nodearticle from '@/components/nodearticle'
import nodemain from '@/components/nodemain'
import nodeuser from '@/components/nodeuser'
import nodeside from '@/components/nodeside'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RootPath',
      components: {
        main: nodemain
      }
    },
    {
      path: '/topic/:id',
      name: 'Article',
      components: {
        main: nodearticle,
        side: nodeside
      }
    },
    {
      path: '/user/:name',
      name: 'User',
      components: {
        main: nodeuser
      }
    },
    {
      path: '/user/:name',
      redirect: '/user:name'
    }
  ]
})
