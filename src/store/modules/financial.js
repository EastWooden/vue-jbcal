import * as type from '../mountaion_types.js'

const state = {
  isShowMethod: 1,
  fainacal: '玖伴金融(优)',
  fainacalCode: 'best'
}
const getters = {
  setfainacal: state => state.fainacal,
  setisShowMethod: state => state.isShowMethod,
  setfainacalCode: state => state.fainacalCode
}
const mutations = {
  [type.GET_FAN] (state, index) {
    if (index === 1) {
      state.fainacal = '玖伴金融(优)'
      state.fainacalCode = 'best'
      state.isShowMethod = 1
    } else if (index === 2) {
      state.fainacal = '玖伴金融(良)'
      state.fainacalCode = 'good'
      state.isShowMethod = 2
    }
  }
}
const actions = {
  showmd ({commit}, index) {
    commit(type.GET_FAN, index)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
