import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { isAuthenticated: false, error: null },
  getters: {},
  mutations: {
    changeAuth(state, payload) {
      state.isAuthenticated = payload;
    },
    setError(state, errorMessage) {
      state.error = errorMessage;
    },
  },
  actions: {},
  modules: {},
});
