import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/index.js'
Vue.use(Vuex)


const state = {
  position: {},
  user: null
}

const mutations = {
  setPosition (state, val) {
    state.position = val
  },
  setUser (state, val) {
    state.user = val.name
    console.log(val)
    localStorage.setItem('token',val.token)
  },
}

const actions = {
  setPosition ({ commit }, val) {
    // 异步请求后端获取当前位置数据
    commit('setPosition', val)
  },
  setUser ({ commit }, val) {
    commit('setUser', val)
  },
  async validate({ commit }) {
    const r = await api.validate();
    if (r.data.code === 1) {
      return false;
    }
    console.log(r)
    commit('setUser', {name : r.data.username,token : r.data.token});
    console.log("123132" + r.data.token)
    localStorage.setItem('token', r.data.token);
    return true;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
