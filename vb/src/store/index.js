import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editable: true,
    fireUser: null
  },
  mutations: {
    selfEdit(state, edit) {
      state.editable = edit
    },
    setFireUser (state, fu) { // 사용자 인증부분 저장
      state.fireUser = fu
    }
  },
  actions: {
  },
  modules: {
  }
})
