import * as types from './mutations-type'

// 添加进购物车
export const addProductToCart = ({commit}, products) => {
  if (products.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: products.id
    })
  }
}
