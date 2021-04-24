import axios from "@/api/backend.js";
import dayjs from "dayjs";

export default {
  namespaced: true,
  state: () => ({
    question: null,
    answers: [],
    currentAnswer: null,
    answerSortingOrder: "asc",
  }),
  getters: {
    getAnswers: (state) => (query) => {
      const parent = query && "parent" in query ? query.parent : null;
      if (!state.answers || !state.answers.length) {
        return [];
      }
      return state.answers
        .filter((answer) => {
          return parent ? answer.parent === parent : !("parent" in answer);
        })
        .sort((answerOne, answerTwo) => {
          const a = dayjs(answerOne.created).unix();
          const b = dayjs(answerTwo.created).unix();

          return state.answerSortingOrder === "asc" ? a - b : b - a;
        });
    },
    filterAnswers: (state) => (query) =>
      state.answers.filter((answer) => Object.entries(query).every(([key, value]) => answer[key] === value)),
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
    async FETCH_PARTICULAR_ANSWER({ commit }, { question, answer }) {
      const response = await axios.get(`/api/v2/homework/questions/${question}/answers/${answer}/`);
      commit("APPEND_ANSWER", response.data);
    },
    async POST_ANSWER({ dispatch }, { question, answer }) {
      await axios.post(`/api/v2/homework/questions/${question}/answers/`, answer);
      await dispatch("FETCH_ANSWERS", { question });
    },
  },
  mutations: {
    SET_QUESTION(state, question) {
      state.question = question;
    },
    SET_ANSWERS(state, answers) {
      state.answers = answers;
    },
    APPEND_ANSWER(state, answer) {
      state.answers.push(answer);
    },
    SET_ANSWER_SORTING_ORDER(state, order) {
      if (!["asc", "desc"].includes(order)) {
        throw new Error("Order may be 'asc' or 'desc'");
      } else {
        state.answerSortingOrder = order;
      }
    },
  },
};
