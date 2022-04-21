import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timeStap:null //结束时间戳
  },
  mutations: {
    SET_TIME_STAP(state,time) {
      state.timeStap = time
    }
  },
  actions: {
  },
  modules: {
  }
})
