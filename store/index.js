import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { login, logout, info } from '@/api/index.js'

const store = new Vuex.Store({
  state: {
    hasLogin: false,
  },
  getters: {},
  mutations: {
    setHasLogin(state, status) {
      state.hasLogin = status
    },
  },
  actions: {
    handleLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          uni.setStorageSync('access-token', res)
          commit('setHasLogin', true)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({ commit }, data) {
      logout().then(res => {
        console.log(res);
      })
    }
  }
})

export default store
