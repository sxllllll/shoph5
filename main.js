import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import i18n from '@/locale/index'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store;

const app = new Vue({
  i18n,
  store,
  ...App
})
app.$mount()
