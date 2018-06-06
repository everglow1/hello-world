import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import First from '@/components/First'
import Logina from '@/components/Logina'
import Admin from '@/components/Admin'
import Student from '@/components/Student'

Vue.use(Router)

// 创建router
export default new Router({
  // mode: 'history',
  // 设置路由样式为active
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'First',
      component: First
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logina',
      name: 'Logina',
      component: Logina
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
