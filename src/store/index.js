import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import SecureLS from "secure-ls";
const localStorage = new SecureLS({ isCompression: false });

Vue.use(Vuex);

import auth from "./auth.js";
import question from "./question.js";
import user from "./user.js";
import userInput from "./userInput.js";

export default new Vuex.Store({
  modules: {
    auth,
    question,
    user,
    userInput,
  },
  plugins: [
    createPersistedState({
      paths: ["auth", "userInput"],
      storage: {
        getItem: (key) => localStorage.get(key) || Cookies.get(key),
        setItem: (key, value) => localStorage.set(key, value),
        removeItem: (key) => localStorage.remove(key),
      },
    }),
  ],
});
