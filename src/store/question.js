import axios from "@/api/backend.js";

export default {
  namespaced: true,
  state: () => ({
    question: null,
    answers: [],
  }),
  getters: {
    getAnswers: (state) => (query) => {
      const parent = query && "parent" in query ? query.parent : null;
      return state.answers.filter((answer) => {
        return parent ? answer.parent === parent : !("parent" in answer);
      });
    },
  },
  actions: {
    async FETCH_QUESTION({ commit }, { id }) {
      const response = await axios.get(`/api/v2/homework/questions/${id}/`);

      commit("SET_QUESTION", response.data);
    },
    async FETCH_ANSWERS({ commit }, { question }) {
      const response = await axios.get(`/api/v2/homework/questions/${question}/answers/?page_size=203`);

      commit("SET_ANSWERS", response.data);
    },
  },
  mutations: {
    SET_QUESTION(state, question) {
      state.question = question;
    },
    SET_ANSWERS(state, answers) {
      state.answers = answers;
    },
  },
};
