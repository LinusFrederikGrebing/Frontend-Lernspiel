import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import scrollanimation from "./directives/scrollanimation"

Vue.directive("scrollanimation", scrollanimation);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
