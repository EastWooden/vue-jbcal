import * as type from '../mountaion_types.js'
import Vue from 'vue'
const state = {
  currentspec: {
    name: ''
  },
  csprice: 0, // 厂商指导价
  chexingId: '', // 车型id
  jbprice: 0, // 玖伴价格
  spec: {}, // getspec 数据
  discountdesc: ''
}
const getters = {
  currentSpec: state => state.currentspec,
  csprice: state => state.csprice,
  jbprice: state => state.jbprice,
  chexingId: state => state.chexingId
}
const mutations = {
  [type.GET_PRICE] (state, res) {
    state.spec = res.body
    state.jbprice = res.body.price.MinPrice
    state.discountdesc = res.body.discountdesc
    if (state.discountdesc !== '') {
      alert(state.discountdesc)
    }
  },
  [type.GET_CURRENTSPEC] (state, item) {
    state.currentspec = item
    state.csprice = item.price
    state.chexingId = item.id
  }
}
const actions = {
  getcurrentspec ({commit}, item) {
    commit(type.GET_CURRENTSPEC, item)
    Vue.http.jsonp('http://oa.ccsh177.cn/cal/ajax/getspec.html', {params: {chexingId: state.chexingId}}).then(res => {
      commit(type.GET_PRICE, res)
    }).catch(error => {
      console.log(error)
      alert('获取服务器数据失败')
    })
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
