import shop from '../../api/shop.js'
import * as types from '../mutations-type'

const state = {
  all: []
}

const getters = {
  allProducts: state => state.all
}

const mutations = {
  [types.RECEIVE_PRODUCTS] (state, {products}) {
    state.all = products
    console.log('mutatons')
  }
}

const actions = {
  getAllProducts ({commit}) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, {products})
    })
    console.log('actions')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
