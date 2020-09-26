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

// 全ユーザのメモリ使用量を集計してしまうと、データが大量に送信されてしまい、
// Netlify Functions の無料枠を食いつぶしてしまうので、5% のセッションを対象に
// メモリ集計を ON にする
if (Math.random() < 0.05) memoryMeasurementScheduler.start()

Vue.use(VueRouter)
Vue.use(MuseUI)
Vue.use(Snotify, { toast: { position: SnotifyPosition.rightTop } })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
