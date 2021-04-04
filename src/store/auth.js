import Vue from "vue";
import axios from "@/api/backend.js";

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    async REQUEST_PASSWORDLESS_TOKEN(_, { email }) {
      return axios.get(`/api/v2/auth/passwordless-token/request/${email}/`);
    },
    async EXCHANGE_PASSWORDLESS_TOKEN_TO_JWT({ commit, dispatch }, { passwordlessToken }) {
      const response = await axios.get(`/api/v2/auth/passwordless-token/${passwordlessToken}`);

      commit("SET_TOKEN", response.data.token);
      await dispatch("FETCH_USER");
    },
    async FETCH_USER({ commit }) {
      const response = await axios.get(`/api/v2/users/me/`);

      commit("SET_USER", response.data);
    },
  },
  mutations: {
    SET_USER(state, user) {
      Vue.set(state, "user", user);
    },
    SET_TOKEN(state, token) {
      Vue.set(state, "token", token);
    },
  },
};
