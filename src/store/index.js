import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  onshowlist: []
}

const mutations = {
  set_onshowlist (state, list) {
    state.onshowlist = list
  }
}

const actions = {
  set_onshowlist ({commit}, list) {
    commit('set_onshowlist', list)
  }
}

const getters = {
  onshowlist (state) {
    return state.onshowlist
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
