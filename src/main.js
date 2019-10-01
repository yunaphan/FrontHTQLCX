import Vue from 'vue';
import App from './App.vue';
import router from './route';
import vuetify from './plugins/vuetify';
import store from "./store/store"
import VueApexCharts from 'vue-apexcharts'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBfd4mIJqjuwYVai39tf9bbBzTerGdv2KA",
  authDomain: "htqlcx.firebaseapp.com",
  databaseURL: "https://htqlcx.firebaseio.com",
  projectId: "htqlcx",
  storageBucket: "",
  messagingSenderId: "1039388797015",
  appId: "1:1039388797015:web:80a2e0089db4baf1c51b12",
  measurementId: "G-SWSD7K3YF4"
};
firebase.initializeApp(firebaseConfig)
firebase.messaging().usePublicVapidKey('BCiThXboXh53P2nFJ9-gmbOJ_q-dne-UUWubkcwtgqZgAdTyugVR8rsEpgFBPafLzoX2rxQqedQbT_2QrAU58BI')
firebase.messaging().requestPermission().then(function () {
  //getToken(messaging);
  return firebase.messaging().getToken();
}).then(function (token) {
  console.log(token)
})
const channel = new BroadcastChannel('sw-messages');
channel.addEventListener('message', event => {
    let data = event.data;
    console.log(data);
    let notification;
    let xToken = $('meta[name=x-token]').attr('content');
    if (typeof xToken != 'undefined') {
        notification = {
            message: data.actionTitle,
            icon: data.avatar,
            title: data.title,
            url: data.urlDetail,
            author: data.author,
        };
        pushNotify(notification);
        setNotify();
    }
});
Vue.component('apexcharts', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
