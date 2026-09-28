import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    errorST: false,
    user: null,
    isSub: false,
    isReview: false,
  },
  mutations: {
    updateUser(state, data) {
      // if (data.IsSub) {
      //   state.isSub = true;
      // }
      return (state.user = data);
    },
    updateState(state) {
      return (state.isSub = true);
    },
    updateReview(state) {
      return (state.isReview = true);
    },
    updateError(state, data) {
      state.error = null;
      return (state.error = data), (state.errorST = true);
    },
    updateClose(state) {
      return (state.errorST = false);
    },
  },
  actions: {},
  modules: {},
});
