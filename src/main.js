import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import router from './router'
import './registerServiceWorker'
import store from './store'
import VueTheMask from 'vue-the-mask'
import { values, valuesK } from "@/filters";

Vue.filter("values", values);
Vue.filter("valuesK", valuesK);
Vue.use(VueRouter);
Vue.use(VueTheMask)
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
