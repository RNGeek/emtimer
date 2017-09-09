<template>
  <div>
    <app-bar />
    <router-view></router-view>
    <app-footer />
  </div>
</template>

<script>
import AppBar from './pages/AppBar';
import AppFooter from './pages/AppFooter';

export default {
  name: 'app',
  components: {
    AppBar,
    AppFooter,
  },
};
</script>
