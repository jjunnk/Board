import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editable: false,
    fireUser: null,
    user: null,
    myImage:require("@/assets/scratch1.jpg"),
    illustrationImage: require("@/assets/scratch2.jpg"),
    illustrationDescription: "Illustration of me",
  },
  getters: {},
  mutations: {
    setEdit(state, edit) {
      state.editable = edit;
    },
    setFireUser(state, fu) {
      state.fireUser = fu;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {}
});
