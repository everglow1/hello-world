const state = {
  // 商品列表
  shop_list :[
    {id: 11, name: '鱼香肉丝', price: 12},
    {id: 12, name: '土豆', price: 22},
    {id: 13, name: '宫保鸡丁', price: 34},
    {id: 14, name: '麻辣香锅', price: 56}
  ],
  // 添加到购物车的商品
  added: []
}

const getters = {
  shoplist: state => state.shop_list
}

const mutations = {

}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}