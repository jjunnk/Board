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
    setFireUser (state, fuser) {
      state.fireUser = fuser
    }
  },
  actions: {
  },
  modules: {
  }
})
