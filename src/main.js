import Vue from "vue";
import * as Sentry from "@sentry/vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    Vue,
    dsn: "https://ba238a6269f742aab98f715c334fbc36@o47144.ingest.sentry.io/5731954",
  });
}
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
