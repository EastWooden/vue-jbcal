import * as type from '../mountaion_types.js'

const state = {
  curSeries: {
    name: ''
  },
  carName2: ''
}

const getters = {
  getcurSeries: state => state.curSeries,
  carName2: state => state.carName2
}

const mutations = {
  [type.CURRENTSERIES] (state, item) {
    state.curSeries = item
    state.carName2 = item.name
    console.log('车系' + state.curSeries.name)
  }
}

const actions = {
  getCurrentSeries ({commit}, item) {
    commit(type.CURRENTSERIES, item)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
