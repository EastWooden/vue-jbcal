import * as type from '../mountaion_types.js'
import Vue from 'vue'
const state = {
  brandsList: [],
  currentBrand: {
    name: '请选择您想购买的汽车'
  },
  carName1: '',
  mainshow: false
}

const getters = {
  getbrandsList: state => state.brandsList,
  getCurrenBrand: state => state.currentBrand,
  carName1: state => state.carName1,
  mainshow: state => state.mainshow
}

const mutations = {
  [type.GET_BARNDS] (state, response) {
    // alert('进入mutation');
    state.brandsList = response.body.result.brandlist
    // alert('进入mutation修改成功')
  },
  [type.GET_CURRENTBRANDS] (state, zitem) {
    state.currentBrand = zitem
    state.carName1 = zitem.name
    console.log('品牌' + state.carName1)
  }
}

const actions = {
  getALLbrands ({commit}) {
    // alert('进入action')
    Vue.http.jsonp('http://oa.ccsh177.cn/cal/ajax/getfactory.html').then(response => {
      // alert('action中调用vue-resource成功')
      commit(type.GET_BARNDS, response)
    }).catch(error => {
      console.log(error)
      alert('获取服务器数据失败')
    })
  },
  getCurrentBrand ({commit}, zitem) {
    commit(type.GET_CURRENTBRANDS, zitem)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
