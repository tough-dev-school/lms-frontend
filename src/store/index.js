import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

import auth from "./auth.js";

export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ["auth"],
      storage: {
        getItem: (key) => {
          return Cookies.get(key);
        },
        setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: false }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
});
