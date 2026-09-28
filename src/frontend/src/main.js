import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from "axios";
import seon from "./seon.js";
import VueCookies from "vue-cookies";
import VueDayjs from "vue-dayjs-plugin";

import "../public/css/slick.css";
import "../public/css/common.css";
import "../public/css/style.css";

Vue.use(seon);
Vue.use(VueCookies);
Vue.use(VueDayjs);

Vue.config.productionTip = false;

// Vue.prototype.$axios = axios;

window.onpageshow = function () {
  if (document.getElementById("useCheck")) {
    document.getElementById("useCheck").checked = false;
  }
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
