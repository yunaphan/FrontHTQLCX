import Vue from 'vue';
import App from './App.vue';
import router from './route';
import vuetify from './plugins/vuetify';
import store from "./store/store";
import VueApexCharts from 'vue-apexcharts';
import VueSession from 'vue-session';
Vue.use(VueSession)

Vue.component('apexcharts', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
