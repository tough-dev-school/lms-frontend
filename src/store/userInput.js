import Vue from "vue";

export default {
  namespaced: true,
  state: () => ({
    fields: {},
  }),
  getters: {
    getField: (state) => (field) => state.fields[field],
  },
  mutations: {
    SET_FIELD(state, { key, value }) {
      Vue.set(state.fields, key, value);
    },
  },
};
