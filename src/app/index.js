import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import logger from '../common/logger'
import Vuetify from 'vuetify/lib'
import { Scroll } from 'vuetify/lib/directives'
import VueClipboard from 'vue-clipboard2'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

logger.init({Vue})

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(VueClipboard)
Vue.use(Vuetify, {
  theme: {
    primary: colors.lightBlue,
  },
  directives: {
    Scroll, // TODO: remove this after the version of vuetify-loader containing https://github.com/vuetifyjs/vuetify-loader/pull/38 be published
  }
})

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

if (DEBUG) {
  window.app = app
  import('webextension-polyfill').then(browser => {
    window.browser = browser.default
  })
  import('@/common/service/gdrive').then(gt => {
    window.gt = gt
    window.gdrive = gt.default
  })
}
