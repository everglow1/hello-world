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
// getter 抛出去的数据
const getters = {
  // 商品列表
  shoplist: state => state.shop_list,
  // 购物车列表
  cartProducts: state => {
    return state.added.map(({id, num}) => { // 在actions中只有id和num的字段
      // 在原始数据上面进行筛选，这里通过id来匹配
      let product = state.shop_list.find(n => n.id == id)
      return {...product, num}
    })
  },
  // 计算总价
  totalPrice: (state, getters) => {  // getters可以调用getters里面的方法
    let total = 0;
    getters.cartProducts.forEach(n => {
      total += n.price * n.num
    })
    return total;
  },
//  计算总数量
  totalNum: (state, getters) => {
    let total = 0;
    getters.cartProducts.forEach(n => {
      total += n.num
    })
    return total;
  }
}

const mutations = {
  // 添加到购物车
  add (state, {id}) {
    let record = state.added.find(n => n.id == id);
    if (!record) {
      state.added.push({id, num: 1})
    } else {
      record.num++
    }
    // console.log(record)
  },
  // 删除购物车指定物品
  del (state, product) {
    // forEach方法：方法中的function回调支持3个参数，第一个是遍历数组的内容
    // 第二个是是对应的数组索引，第三个是数组本身
    state.added.forEach((n, i) => {
      if (n.id === product.id) {
        // 找到index的下标值
        state.added.splice(i, 1)
      }
    })
  },
  clearAll (state) {
    state.added = [];
  }
}

// action可以包含任何异步操作
const actions = {
  // 添加到购物车的操作
  addToCart({commit}, product) {
    // 传递一个add方法，携带参数id
    commit('add', {id: product.id})
  },
  // 删除购物车中的指定物品
  delProduct({commit}, product) {
    commit('del', product)
  },
  clearAllCart({commit}) {
    // 分发一个clearAll事件，不带参数进行
    commit('clearAll')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}