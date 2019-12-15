import Vue from 'vue';
import App from './App.vue';
import router from './route';
import vuetify from './plugins/vuetify';
import store from "./store/store";
import VueApexCharts from 'vue-apexcharts';
import VueSession from 'vue-session';
import DaySpanVuetify from 'dayspan-vuetify';
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'
import VueDraggable from 'vue-draggable'
import 'vue-material-design-icons/styles.css';
Vue.use(VueDraggable)
const firebaseConfig = {
  apiKey: "AIzaSyBfd4mIJqjuwYVai39tf9bbBzTerGdv2KA",
  authDomain: "htqlcx.firebaseapp.com",
  databaseURL: "https://htqlcx.firebaseio.com",
  projectId: "htqlcx",
  storageBucket: "htqlcx.appspot.com",
  messagingSenderId: "1039388797015",
  appId: "1:1039388797015:web:80a2e0089db4baf1c51b12",
  measurementId: "G-SWSD7K3YF4"
};

firebase.initializeApp(firebaseConfig)

Vue.use(VueSession)

Vue.component('apexcharts', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});