import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  blogList: [],
  activeType: '__all__',
  blogId: '',
  token: '',
  page: 0,
  info: '',
  userPageId: ''
}

const mutations = {
  set_blogList (state, list) {
    state.blogList = list
  },
  set_activeType (state, type) {
    state.activeType = type
  },
  loadMoreBlog (state, list) {
    state.blogList = state.blogList.concat(list)
  },
  set_blogId (state, id) {
    state.blogId = id
  },
  set_token (state, token) {
    state.token = token
  },
  set_page (state, page) {
    state.page = page
  },
  set_info (state, info) {
    state.info = info
  },
  set_userPageId (state, id) {
    state.userPageId = id
  }
}

const actions = {
  set_blogList ({commit}, list) {
    commit('set_blogList', list)
  },
  set_activeType ({commit}, type) {
    commit('set_activeType', type)
    commit('set_page', 0)
  },
  loadMoreBlog ({commit}, list) {
    commit('loadMoreBlog', list)
  },
  set_blogId ({commit}, id) {
    commit('set_blogId', id)
  },
  set_token ({commit}, token) {
    commit('set_token', token)
  },
  set_page ({commit}, page) {
    commit('set_page', page)
  },
  set_info ({commit}, info) {
    commit('set_info', info)
  },
  set_userPageId ({commit}, id) {
    commit('set_userPageId', id)
  }
}

const getters = {
  blogList (state) {
    return state.blogList
  },
  activeType (state) {
    return state.activeType
  },
  blogId (state) {
    return state.blogId
  },
  token (state) {
    return state.token
  },
  page (state) {
    return state.page
  },
  info (state) {
    return state.info
  },
  userPageId (state) {
    return state.userPageId
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
