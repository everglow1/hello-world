import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
// import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products
  }
  // actions
})
