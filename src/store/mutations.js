import * as type from './mountaion_types.js'

export const mutations = {
  [type.ADD_TO_CURBRAND] (state,carName) {
    state.carName = state.currentBrand.name + state.curSeriesname
  }
}