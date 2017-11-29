import VueRouter from 'vue-router';
import Home from './pages/Home';
import SimpleTimer from './pages/SimpleTimer';
import About from './pages/About';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/SimpleTimer',
      component: SimpleTimer,
      meta: { title: 'シンプルタイマー · Emtimer' },
    },
    {
      path: '/About',
      component: About,
      meta: { title: 'About · Emtimer' },
    },
    {
      path: '/',
      component: Home,
      meta: { title: 'Emtimer' },
    },
    { path: '*', redirect: '/404' },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
