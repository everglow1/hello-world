import Vue from 'vue'
import Vuex from 'vuex'

// 引入cart模块
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart
  },
})