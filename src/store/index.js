import Vue from 'vue'
import Vuex from 'vuex'
import brands from './modules/brands'
import series from './modules/series'
import spec from './modules/spec'
import financial from './modules/financial'
// import types from './mountaion_types.js'
// import * as mutations from './mutations'
// import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  // mutations,
  modules: {
    brands,
    series,
    spec,
    financial

  }
})

export default store
