import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0277BD',
        secondary: '#01579B',
        accent: '#82B1FF',
        error: '#C62828',
        info: '#2196F3',
        success: '#00ACC1',
        warning: '#78909C'
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
