// 存接口api
export function saveToLocal(id, key, value) {
  // 把值存到 localStorage的  __seller__ 下面
  // 双下划线的风格表明这是私有的
  // 指名是window下的
  let seller = window.localStorage.__seller__;
  // 第一次肯定没有seller，所以
  if (!seller) {
    seller = {};
    // 每个id都是一个单独的object
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  // 把这个数据结构保存到localStorage.__seller__里面
  window.localStorage.__seller__ = JSON.stringify(seller);
}

// 读api
export function loadFromLocal(id, key, def) {
  // 首先读这个seller
  let seller = window.localStorage.__seller__;
  if (!seller) {
    // 如果没有seller，就返回默认值
    return def;
  }
  // 如果有的话，就用json.parse转化json，然后取当前商家的对象，
  seller = JSON.parse(seller)[id];
  if (!seller) {
    // 如果取不到的话就返回默认值
    return def;
  }
  // 如果有的话，就看商家下面有没有这个key
  let ret = seller[key];
  // 有就返回ret ，如果没有就返回 def
  return ret || def;
}
