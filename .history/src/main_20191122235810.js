import Vue from 'vue';
import App from './App.vue';
import router from './route';
import vuetify from './plugins/vuetify';
import store from "./store/store";
import VueApexCharts from 'vue-apexcharts';
import VueSession from 'vue-session';
import DaySpanVuetify from 'dayspan-vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'

Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});
Vue.use(VueSession)

Vue.component('apexcharts', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
