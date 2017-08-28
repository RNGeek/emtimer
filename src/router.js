import VueRouter from 'vue-router';
import SimpleTimer from './pages/SimpleTimer';
import About from './pages/About';

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/SimpleTimer',
      component: SimpleTimer,
    },
    {
      path: '/About',
      component: About,
    },
    {
      path: '/',
      component: SimpleTimer,
    },
  ],
});
