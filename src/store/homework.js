import axios from "@/api/backend.js";

export default {
  namespaced: true,
  state: () => ({
    question: null,
  }),
  actions: {
    async FETCH_QUESTION({ commit }, { id }) {
      const response = await axios.get(`/api/v2/homework/questions/${id}/`);

      commit("SET_QUESTION", response.data);
    },
  },
  mutations: {
    SET_QUESTION(state, question) {
      state.question = question;
    },
  },
};
