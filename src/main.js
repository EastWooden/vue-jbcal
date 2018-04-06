// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Scrollspy from 'vue2-scrollspy'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueResource from 'vue-resource'
import './common/stylus/index.styl'

Vue.use(Scrollspy)
Vue.use(VueResource)
// Object.assign = require('object.assign')
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
