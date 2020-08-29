// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'vue-snotify/styles/material.css'
import router from './router'
import App from './App.vue'
import { memoryMeasurementScheduler } from './lib/memory'

memoryMeasurementScheduler.start()

Vue.use(VueRouter)
Vue.use(MuseUI)
Vue.use(Snotify, {toast: {position: SnotifyPosition.rightTop}})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
