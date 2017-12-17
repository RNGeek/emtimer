import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import SimpleTimer from './pages/SimpleTimer.vue'
import About from './pages/About.vue'
import { Component } from 'vue-router/types/router'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/SimpleTimer',
      component: (SimpleTimer as Component),
      meta: { title: 'シンプルタイマー · Emtimer' }
    },
    {
      path: '/About',
      component: (About as Component),
      meta: { title: 'About · Emtimer' }
    },
    {
      path: '/',
      component: (Home as Component),
      meta: { title: 'Emtimer' }
    },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title
  next()
})

export default router
