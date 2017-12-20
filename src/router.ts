import Vue, { ComponentOptions } from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import SimpleTimer from './pages/SimpleTimer.vue'
import About from './pages/About.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/SimpleTimer',
      component: (SimpleTimer as ComponentOptions<Vue>),
      meta: { title: 'シンプルタイマー · Emtimer' },
    },
    {
      path: '/About',
      component: (About as ComponentOptions<Vue>),
      meta: { title: 'About · Emtimer' },
    },
    {
      path: '/',
      component: (Home as ComponentOptions<Vue>),
      meta: { title: 'Emtimer' },
    },
    { path: '*', redirect: '/404' },
  ],
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title
  next()
})

export default router
