// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css'
import axios from 'axios'
import store from './vuex/store'


Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: `https://hack-overflowing.appspot.com/`
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
