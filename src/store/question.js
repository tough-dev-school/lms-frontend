import axios from "@/api/backend.js";

export default {
  namespaced: true,
  state: () => ({
    question: null,
    answers: [],
    currentAnswer: null,
  }),
  getters: {
    getAnswers: (state) => (query) => {
      const parent = query && "parent" in query ? query.parent : null;
      if (!state.answers || !state.answers.length) {
        return [];
      }
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

      commit("SET_ANSWERS", response.data.results);
    },
    async POST_ANSWER({ dispatch }, { question, answer }) {
      await axios.post(`/api/v2/homework/questions/${question}/answers/`, answer);
      dispatch("FETCH_ANSWERS", { question });
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
