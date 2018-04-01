import shop from '../../api/shop.js'
import * as types from '../mutations-type'
// import * as actions from '../actions.js'

const state = {
  // 添加到购物车的商品，数组
  all: []
}

const getters = {
  // 所有的商品
  allProducts: state => state.all
  // cartProducts: state => {
  //   return state.all.map(({id, num}) => {
  //     let product = shop._products.find(n => n.id === id)
  //     return {...product, num}
  //   })
  // }
}

const mutations = {
  // 保存在购物车
  [types.RECEIVE_PRODUCTS] (state, {products}) {
    state.all = products
    console.log('mutatons')
  }
  // 添加进购物车
  // [types.ADD_TO_CART] (state, {id}) {
  //   state.all.find(product => product.id === id).inventory--
  //   console.log('test')
  // }
}

const actions = {
  getAllProducts ({commit}) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, {products})
    })
    console.log('actions')
  }
  // addProductToCart ({commit}, product) {
  //   shop
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
