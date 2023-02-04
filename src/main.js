import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '../main.css'
import scrollanimation from "./directives/scrollanimation"
import VueI18n from 'vue-i18n'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import de from '../data/locals/de';
import en from '../data/locals/en';
import FlagIcon from 'vue-flag-icon'

Vue.use(FlagIcon);
Vue.use(VueSweetalert2);
Vue.use(VueI18n);
Vue.directive("scrollanimation", scrollanimation);
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    en, 
    de
  }
})

new Vue({
  vuetify,
  i18n,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
