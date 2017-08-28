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
      meta: { title: 'シンプルタイマー · エメタイマー' },
    },
    {
      path: '/About',
      component: About,
      meta: { title: 'About · エメタイマー' },
    },
    {
      path: '/',
      component: Home,
      meta: { title: 'エメタイマー' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
