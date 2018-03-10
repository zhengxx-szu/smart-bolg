import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  blogList: []
}

const mutations = {
  set_blogList (state, list) {
    state.blogList = list
  }
}

const actions = {
  set_blogList ({commit}, list) {
    commit('set_blogList', list)
  }
}

const getters = {
  blogList (state) {
    return state.blogList
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
